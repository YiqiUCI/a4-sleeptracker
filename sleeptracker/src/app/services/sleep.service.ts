import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

interface SavedLogs {
  overnight: { id: string; loggedAt: string; sleepStart: string; sleepEnd: string }[];
  sleepiness: { id: string; loggedAt: string; loggedValue: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private readonly storageKey = 'sleeptracker.logs';
  overnightData: OvernightSleepData[] = [];
  sleepinessData: StanfordSleepinessData[] = [];

  async loadData() {
    const { value } = await Preferences.get({ key: this.storageKey });
    if (value === null) {
      return;
    }

    // JSON keeps dates as strings, so turn them back into Date objects.
    const logs: SavedLogs = JSON.parse(value);
    this.overnightData = logs.overnight.map(entry => {
      const sleep = new OvernightSleepData(new Date(entry.sleepStart), new Date(entry.sleepEnd));
      sleep.id = entry.id;
      sleep.loggedAt = new Date(entry.loggedAt);
      return sleep;
    });
    this.sleepinessData = logs.sleepiness.map(entry => {
      const sleepiness = new StanfordSleepinessData(entry.loggedValue, new Date(entry.loggedAt));
      sleepiness.id = entry.id;
      return sleepiness;
    });
  }

  async logOvernightData(sleepData: OvernightSleepData) {
    const overnight = [sleepData, ...this.overnightData];
    await this.saveData(overnight, this.sleepinessData);
    this.overnightData = overnight;
  }

  async logSleepinessData(sleepData: StanfordSleepinessData) {
    const sleepiness = [sleepData, ...this.sleepinessData];
    await this.saveData(this.overnightData, sleepiness);
    this.sleepinessData = sleepiness;
  }

  private async saveData(overnight: OvernightSleepData[], sleepiness: StanfordSleepinessData[]) {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify({ overnight, sleepiness })
    });
  }
}
