
export enum CalculatorTab {
  DASHBOARD = 'DASHBOARD',
  HOURLY_RATE = 'HOURLY_RATE',
  OVERTIME = 'OVERTIME',
  NIGHT_WORK = 'NIGHT_WORK',
  EXEMPTION = 'EXEMPTION',
  SETTINGS = 'SETTINGS'
}

export interface Settings {
  weekday1st: number;
  weekdaySub: number;
  holiday: number;
  extWeekday1st: number;
  extWeekdaySub: number;
  extHoliday: number;
  nightWork: number;
  exemption: number;
}

export interface UserContext {
  baseSalary: number;
  weeklyHours: number;
}
