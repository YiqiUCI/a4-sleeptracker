import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	readonly sleepStart:Date;
	readonly sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString(compact = false):string {
		const totalMinutes = Math.floor((this.sleepEnd.getTime() - this.sleepStart.getTime()) / (1000 * 60));
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (compact) {
			return hours + 'h ' + minutes + 'm';
		}
		return hours + ' hours, ' + minutes + ' minutes.';
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}
}
