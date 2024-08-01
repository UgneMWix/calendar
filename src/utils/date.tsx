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
