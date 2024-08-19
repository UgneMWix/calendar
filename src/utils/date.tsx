export function generateWeek(startDay: string): Array<string> {
  return generateNDays(7, startDay);
}
export function generateNDays(n: number, startDay: string): Array<string> {
  return Array.from({ length: n }, (_, index) => {
    const day = new Date(startDay);
    day.setDate(day.getDate() + index);
    return day.toISOString();
  });
}
export function getFirstDayOfWeek(day: string) {
  const dayDate = new Date(day);
  return new Date(dayDate.setDate(dayDate.getDate() - dayDate.getDay())).toISOString();
}

export function generateHoursOfTheDay(day: string): Array<string> {
  return Array.from({ length: 24 }, (_, index) => {
    const time = new Date(day);
    time.setUTCHours(0);
    time.setUTCHours(time.getUTCHours() + index);
    return time.toISOString();
  });
}

export function getFirstDayOfTheMonth(dateISO: string) {
  const date = new Date(dateISO);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = 1;
  return new Date(Date.UTC(year, month, day)).toISOString();
}

export function getMonthFromDate(dateISO: string) {
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, { month: 'long', timeZone: 'UTC' });
}
export function getYearFromDate(dateISO: string) {
  const date = new Date(dateISO);
  return date.getUTCFullYear();
}
export function isInTheSameWeek(startDateISO: string, dateISO: string) {
  const date = new Date(dateISO);
  const startDate = new Date(startDateISO);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(startDateISO);
  endDate.setUTCHours(23, 59, 59, 0);
  endDate.setUTCDate(startDate.getUTCDate() + 6);
  if (date > startDate && date < endDate) {
    return true;
  }
  return false;
}
export function getToday() {
  return new Date().toISOString();
}
export function getDayOfWeekName(day: string, format: 'long' | 'short' | 'narrow') {
  const date = new Date(day);
  return date.toLocaleDateString(undefined, { weekday: format, timeZone: 'UTC' });
}
export function areDaysTheSame(day1: string, day2: string, options?: { checkTime: boolean }) {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  if (options?.checkTime) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&
      date1.getHours() === date2.getHours()
    );
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
// TODO: Remove in favor of getComponentsFromDate
export function getDayOfMonthNumber(day: string) {
  const date = new Date(day);
  return date.getDate();
}
export function getDateObjectFromString(dateISO: string) {
  return new Date(dateISO);
}
// TODO: Write tests
export function getComponentsFromDate(dateISO: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minutes: number;
} {
  const date = new Date(dateISO);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
  };
}
export function areMonthsTheSame(date1ISO: string, date2ISO: string) {
  const date1 = new Date(date1ISO);
  const date2 = new Date(date2ISO);
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}
export function setTime(
  dateISO: string,
  time: {
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  },
) {
  const date = new Date(dateISO);
  date.setUTCHours(
    time.hours ?? date.getUTCHours(),
    time.minutes ?? date.getUTCMinutes(),
    time.seconds ?? date.getUTCSeconds(),
    time.milliseconds ?? date.getUTCMilliseconds(),
  );
  return date.toISOString();
}
export function dayArithmetic(dateISO: string, days: number) {
  const date = new Date(dateISO);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}
export function monthArithmetic(dateISO: string, months: number) {
  const date = new Date(dateISO);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
}
export function howManyDaysUntilEndOfWeek(day: string) {
  const date = new Date(day);
  return 6 - date.getDay();
}
export function getLengthOfEvent(startDateISO: string, endDateISO: string) {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  let count = 1;
  while (
    startDate.getUTCFullYear() !== endDate.getUTCFullYear() ||
    startDate.getUTCMonth() !== endDate.getUTCMonth() ||
    startDate.getUTCDate() !== endDate.getUTCDate()
  ) {
    startDate.setUTCDate(startDate.getUTCDate() + 1);
    count++;
  }
  return count;
}

export function getDifferenceInHours(startDateISO: string, endDateISO: string) {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  const hoursSpan = endDate.getUTCHours() - startDate.getUTCHours();
  const minutesSpan = (endDate.getUTCMinutes() - startDate.getUTCMinutes()) / 60;
  return hoursSpan + minutesSpan;
}
