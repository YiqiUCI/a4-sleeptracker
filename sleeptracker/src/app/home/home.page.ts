import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonContent, IonFooter, IonIcon, IonSegment, IonSegmentButton,
  IonLabel, IonButton, IonModal, IonDatetime
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, chevronDownOutline, moonOutline, sunnyOutline } from 'ionicons/icons';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    DatePipe, FormsModule, IonHeader, IonToolbar, IonContent, IonFooter, IonIcon,
    IonSegment, IonSegmentButton, IonLabel, IonButton, IonModal, IonDatetime
  ],
})
export class HomePage implements OnInit {
  selectedLog = 'overnight';
  bedtime = '';
  wakeTime = '';
  sleepinessLevel: number | null = null;
  sleepinessTime = '';
  sleepinessLevels = StanfordSleepinessData.ScaleValues.slice(1);
  overnightMessage = '';
  sleepinessMessage = '';
  storageError = '';
  ready = false;
  saving = false;

  constructor(public sleepService: SleepService) {
    addIcons({ calendarOutline, chevronDownOutline, moonOutline, sunnyOutline });
  }

  async ngOnInit() {
    try {
      await this.sleepService.loadData();
      this.ready = true;
    } catch {
      this.storageError = 'Could not load your saved logs. Refresh the page to try again.';
    }
  }

  async saveOvernight() {
    if (!this.ready || this.saving) {
      return;
    }

    const start = new Date(this.bedtime);
    const end = new Date(this.wakeTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.overnightMessage = 'Enter both your bedtime and wake time.';
      return;
    }
    if (end <= start) {
      this.overnightMessage = 'Wake time must be after bedtime.';
      return;
    }

    this.saving = true;
    try {
      await this.sleepService.logOvernightData(new OvernightSleepData(start, end));
      this.clearOvernight();
      this.overnightMessage = 'Overnight sleep saved.';
    } catch {
      this.overnightMessage = 'Could not save your log. Please try again.';
    } finally {
      this.saving = false;
    }
  }

  async saveSleepiness() {
    if (!this.ready || this.saving) {
      return;
    }

    const level = this.sleepinessLevel;
    if (level === null || !Number.isInteger(level) || level < 1 || level > 7) {
      this.sleepinessMessage = 'Choose a sleepiness rating from 1 to 7.';
      return;
    }

    const time = this.sleepinessTime ? new Date(this.sleepinessTime) : new Date();
    if (isNaN(time.getTime())) {
      this.sleepinessMessage = 'Enter a valid date and time.';
      return;
    }

    this.saving = true;
    try {
      await this.sleepService.logSleepinessData(new StanfordSleepinessData(level, time));
      this.clearSleepiness();
      this.sleepinessMessage = 'Sleepiness saved.';
    } catch {
      this.sleepinessMessage = 'Could not save your log. Please try again.';
    } finally {
      this.saving = false;
    }
  }

  clearOvernight() {
    this.bedtime = '';
    this.wakeTime = '';
    this.overnightMessage = '';
  }

  clearSleepiness() {
    this.sleepinessLevel = null;
    this.sleepinessTime = '';
    this.sleepinessMessage = '';
  }
}
