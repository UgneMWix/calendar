export function generateWeek(startDay: string): Array<string> {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startDay);
    day.setDate(day.getDate() + index);
    return day.toISOString();
  });
}

export function getFirstDayOfWeek(today: string) {
  const day = new Date(today);
  return new Date(day.setDate(day.getDate() - day.getDay())).toISOString();
}

export function generateHoursOfTheDay(day: string): Array<string> {
  return Array.from({ length: 24 }, (_, index) => {
    const time = new Date(day);
    time.setUTCHours(0);
    time.setUTCHours(time.getUTCHours() + index);
    return time.toISOString();
  });
}
