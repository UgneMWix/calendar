import {
  getYearFromDate,
  generateNDays,
  getFirstDayOfWeek,
  generateHoursOfTheDay,
  getFirstDayOfTheMonth,
  getMonthFromDate,
  isInTheSameWeek,
  getDayOfWeekName,
  areDaysTheSame,
  getDayOfMonthNumber,
  areMonthsTheSame,
  setHours,
  dayArithmetic,
  monthArithmetic,
  howManyDaysUntilEndOfWeek,
  getLengthOfEvent,
  getDifferenceInHours,
} from './date';
import { test, expect, describe } from 'vitest';

describe(getYearFromDate, () => {
  test('should return correct year from ISO date', () => {
    expect(getYearFromDate('2024-08-13T10:54:50.395Z')).toBe(2024);
    expect(getYearFromDate('2024-01-01T00:00:00.000Z')).toBe(2024);
    expect(getYearFromDate('2024-12-31T23:59:59.999Z')).toBe(2024);
  });
});
describe(generateNDays, () => {
  test('should return 7 days starting with the given date', () => {
    expect(generateNDays(7, '2024-08-13T10:54:50.395Z')).toEqual([
      '2024-08-13T10:54:50.395Z',
      '2024-08-14T10:54:50.395Z',
      '2024-08-15T10:54:50.395Z',
      '2024-08-16T10:54:50.395Z',
      '2024-08-17T10:54:50.395Z',
      '2024-08-18T10:54:50.395Z',
      '2024-08-19T10:54:50.395Z',
    ]);
    expect(generateNDays(3, '2024-08-30T10:54:50.395Z')).toEqual([
      '2024-08-30T10:54:50.395Z',
      '2024-08-31T10:54:50.395Z',
      '2024-09-01T10:54:50.395Z',
    ]);
    expect(generateNDays(9, '2024-12-30T10:54:50.395Z')).toEqual([
      '2024-12-30T10:54:50.395Z',
      '2024-12-31T10:54:50.395Z',
      '2025-01-01T10:54:50.395Z',
      '2025-01-02T10:54:50.395Z',
      '2025-01-03T10:54:50.395Z',
      '2025-01-04T10:54:50.395Z',
      '2025-01-05T10:54:50.395Z',
      '2025-01-06T10:54:50.395Z',
      '2025-01-07T10:54:50.395Z',
    ]);
  });
});
describe(getFirstDayOfWeek, () => {
  test('should return the closest previous sunday', () => {
    const tuesday = '2024-08-13T10:54:50.395Z';
    const sunday = '2024-08-11T10:54:50.395Z';
    expect(getFirstDayOfWeek(tuesday)).toBe(sunday);
    expect(getFirstDayOfWeek(sunday)).toBe(sunday);
  });
});
describe(generateHoursOfTheDay, () => {
  test('should return an array of string of the same day with different hours', () => {
    expect(generateHoursOfTheDay('2024-08-13T10:54:50.395Z')).toEqual([
      '2024-08-13T00:54:50.395Z',
      '2024-08-13T01:54:50.395Z',
      '2024-08-13T02:54:50.395Z',
      '2024-08-13T03:54:50.395Z',
      '2024-08-13T04:54:50.395Z',
      '2024-08-13T05:54:50.395Z',
      '2024-08-13T06:54:50.395Z',
      '2024-08-13T07:54:50.395Z',
      '2024-08-13T08:54:50.395Z',
      '2024-08-13T09:54:50.395Z',
      '2024-08-13T10:54:50.395Z',
      '2024-08-13T11:54:50.395Z',
      '2024-08-13T12:54:50.395Z',
      '2024-08-13T13:54:50.395Z',
      '2024-08-13T14:54:50.395Z',
      '2024-08-13T15:54:50.395Z',
      '2024-08-13T16:54:50.395Z',
      '2024-08-13T17:54:50.395Z',
      '2024-08-13T18:54:50.395Z',
      '2024-08-13T19:54:50.395Z',
      '2024-08-13T20:54:50.395Z',
      '2024-08-13T21:54:50.395Z',
      '2024-08-13T22:54:50.395Z',
      '2024-08-13T23:54:50.395Z',
    ]);
    expect(generateHoursOfTheDay('2024-08-30T00:00:00.000Z')).toEqual([
      '2024-08-30T00:00:00.000Z',
      '2024-08-30T01:00:00.000Z',
      '2024-08-30T02:00:00.000Z',
      '2024-08-30T03:00:00.000Z',
      '2024-08-30T04:00:00.000Z',
      '2024-08-30T05:00:00.000Z',
      '2024-08-30T06:00:00.000Z',
      '2024-08-30T07:00:00.000Z',
      '2024-08-30T08:00:00.000Z',
      '2024-08-30T09:00:00.000Z',
      '2024-08-30T10:00:00.000Z',
      '2024-08-30T11:00:00.000Z',
      '2024-08-30T12:00:00.000Z',
      '2024-08-30T13:00:00.000Z',
      '2024-08-30T14:00:00.000Z',
      '2024-08-30T15:00:00.000Z',
      '2024-08-30T16:00:00.000Z',
      '2024-08-30T17:00:00.000Z',
      '2024-08-30T18:00:00.000Z',
      '2024-08-30T19:00:00.000Z',
      '2024-08-30T20:00:00.000Z',
      '2024-08-30T21:00:00.000Z',
      '2024-08-30T22:00:00.000Z',
      '2024-08-30T23:00:00.000Z',
    ]);
    expect(generateHoursOfTheDay('2024-12-31T23:59:59.999Z')).toEqual([
      '2024-12-31T00:59:59.999Z',
      '2024-12-31T01:59:59.999Z',
      '2024-12-31T02:59:59.999Z',
      '2024-12-31T03:59:59.999Z',
      '2024-12-31T04:59:59.999Z',
      '2024-12-31T05:59:59.999Z',
      '2024-12-31T06:59:59.999Z',
      '2024-12-31T07:59:59.999Z',
      '2024-12-31T08:59:59.999Z',
      '2024-12-31T09:59:59.999Z',
      '2024-12-31T10:59:59.999Z',
      '2024-12-31T11:59:59.999Z',
      '2024-12-31T12:59:59.999Z',
      '2024-12-31T13:59:59.999Z',
      '2024-12-31T14:59:59.999Z',
      '2024-12-31T15:59:59.999Z',
      '2024-12-31T16:59:59.999Z',
      '2024-12-31T17:59:59.999Z',
      '2024-12-31T18:59:59.999Z',
      '2024-12-31T19:59:59.999Z',
      '2024-12-31T20:59:59.999Z',
      '2024-12-31T21:59:59.999Z',
      '2024-12-31T22:59:59.999Z',
      '2024-12-31T23:59:59.999Z',
    ]);
  });
});
describe(getFirstDayOfTheMonth, () => {
  test('should return the first day of the month', () => {
    expect(getFirstDayOfTheMonth('2024-08-13T10:54:50.395Z')).toBe('2024-08-01T00:00:00.000Z');
    expect(getFirstDayOfTheMonth('2024-01-01T00:00:00.000Z')).toBe('2024-01-01T00:00:00.000Z');
    expect(getFirstDayOfTheMonth('2024-12-31T23:59:59.999Z')).toBe('2024-12-01T00:00:00.000Z');
  });
});
describe(getMonthFromDate, () => {
  test('should return the month name from the date', () => {
    expect(getMonthFromDate('2024-08-13T10:54:50.395Z')).toBe('August');
    expect(getMonthFromDate('2024-01-01T00:00:00.000Z')).toBe('January');
    expect(getMonthFromDate('2024-12-31T23:59:59.999Z')).toBe('December');
  });
});
describe(isInTheSameWeek, () => {
  test('should return true if the date is in the same week as the start date', () => {
    const sunday = '2024-08-11T10:54:50.395Z';
    const monday = '2024-08-12T10:54:50.395Z';
    const tuesday = '2024-08-13T10:54:50.395Z';
    const sundayOfNextWeek = '2024-08-18T10:54:50.395Z';
    expect(isInTheSameWeek(sunday, tuesday)).toBe(true);
    expect(isInTheSameWeek(sunday, monday)).toBe(true);
    expect(isInTheSameWeek(sunday, sundayOfNextWeek)).toBe(false);
  });
});
describe(getDayOfWeekName, () => {
  test('should return the name of the day of the week', () => {
    expect(getDayOfWeekName('2024-08-13T10:54:50.395Z', 'long')).toBe('Tuesday');
    expect(getDayOfWeekName('2024-08-13T10:54:50.395Z', 'short')).toBe('Tue');
    expect(getDayOfWeekName('2024-08-13T10:54:50.395Z', 'narrow')).toBe('T');
  });
});
describe(areDaysTheSame, () => {
  test('should return true if the two dates are the same', () => {
    const tuesday = '2024-08-13T10:54:50.395Z';
    const wednesday = '2024-08-14T10:54:50.395Z';
    const tuesdayButLater = '2024-08-13T11:54:50.395Z';
    expect(areDaysTheSame(tuesday, tuesday)).toBe(true);
    expect(areDaysTheSame(tuesday, wednesday)).toBe(false);
    expect(areDaysTheSame(tuesday, tuesdayButLater)).toBe(true);
  });
});
describe(getDayOfMonthNumber, () => {
  test('should return the day of the month', () => {
    const thirteenth = '2024-08-13T10:54:50.395Z';
    const fourteenth = '2025-09-14T10:54:50.395Z';
    expect(getDayOfMonthNumber(thirteenth)).toBe(13);
    expect(getDayOfMonthNumber(fourteenth)).toBe(14);
  });
});
describe(areMonthsTheSame, () => {
  test('should return true if the two dates are in the same month', () => {
    const date1 = '2024-08-13T10:54:50.395Z';
    const date2 = '2024-08-14T10:54:50.395Z';
    const date3 = '2024-09-13T10:54:50.395Z';
    expect(areMonthsTheSame(date1, date2)).toBe(true);
    expect(areMonthsTheSame(date1, date3)).toBe(false);
  });
});
describe(setHours, () => {
  test('should return a date with the given hours and minutes', () => {
    expect(setHours('2024-08-13T10:54:50.395Z', 12, 30, 0, 0)).toBe('2024-08-13T12:30:00.000Z');
    expect(setHours('2024-08-13T10:54:50.395Z', 0, 0, 0, 0)).toBe('2024-08-13T00:00:00.000Z');
    expect(setHours('2024-08-13T10:54:50.395Z', 23, 59, 59, 999)).toBe('2024-08-13T23:59:59.999Z');
  });
});
describe(dayArithmetic, () => {
  test('should return the date of the previous or next day', () => {
    const date = '2024-08-13T10:54:50.395Z';
    const newYearsEve = '2024-12-31T10:54:50.395Z';
    const newYears = '2025-01-01T10:54:50.395Z';
    expect(dayArithmetic(date, -1)).toBe('2024-08-12T10:54:50.395Z');
    expect(dayArithmetic(date, 1)).toBe('2024-08-14T10:54:50.395Z');
    expect(dayArithmetic(newYearsEve, 1)).toBe('2025-01-01T10:54:50.395Z');
    expect(dayArithmetic(newYearsEve, -1)).toBe('2024-12-30T10:54:50.395Z');
    expect(dayArithmetic(newYears, -1)).toBe('2024-12-31T10:54:50.395Z');
    expect(dayArithmetic(newYears, 1)).toBe('2025-01-02T10:54:50.395Z');
  });
});
describe(monthArithmetic, () => {
  test('should return the date of the previous or next month', () => {
    const date = '2024-08-13T10:54:50.395Z';
    expect(monthArithmetic(date, -1)).toBe('2024-07-13T10:54:50.395Z');
    expect(monthArithmetic(date, 1)).toBe('2024-09-13T10:54:50.395Z');
    expect(monthArithmetic(date, 2)).toBe('2024-10-13T10:54:50.395Z');
    expect(monthArithmetic(date, -2)).toBe('2024-06-13T10:54:50.395Z');
  });
});
describe(howManyDaysUntilEndOfWeek, () => {
  test('should return the number of days until the end of the week', () => {
    const sunday = '2024-08-11T10:54:50.395Z';
    const monday = '2024-08-12T10:54:50.395Z';
    const tuesday = '2024-08-13T10:54:50.395Z';
    const saturday = '2024-08-17T10:54:50.395Z';
    expect(howManyDaysUntilEndOfWeek(sunday)).toBe(6);
    expect(howManyDaysUntilEndOfWeek(monday)).toBe(5);
    expect(howManyDaysUntilEndOfWeek(tuesday)).toBe(4);
    expect(howManyDaysUntilEndOfWeek(saturday)).toBe(0);
  });
});
describe(getLengthOfEvent, () => {
  test('should return the length of the event in days', () => {
    const startDate = '2024-08-13T10:54:50.395Z';
    const endDate = '2024-08-15T10:54:50.395Z';
    expect(getLengthOfEvent(startDate, endDate)).toBe(3);
    const startDate2 = '2024-08-13T10:54:50.395Z';
    const endDate2 = '2024-08-13T23:59:59.999Z';
    expect(getLengthOfEvent(startDate2, endDate2)).toBe(1);
    const startDate3 = '2024-08-13T10:54:50.395Z';
    const endDate3 = '2024-09-13T10:54:50.395Z';
    expect(getLengthOfEvent(startDate3, endDate3)).toBe(32);
    const startDate4 = '2024-08-13T10:54:50.395Z';
    const endDate4 = '2025-08-13T10:54:50.395Z';
    expect(getLengthOfEvent(startDate4, endDate4)).toBe(366);
  });
});
describe(getDifferenceInHours, () => {
  test('should return the difference in hours between two dates', () => {
    const startDate = '2024-08-13T10:54:50.395Z';
    const endDate = '2024-08-13T11:54:50.395Z';
    expect(getDifferenceInHours(startDate, endDate)).toBe(1);
    const startDate2 = '2024-08-13T10:00:50.395Z';
    const endDate2 = '2024-08-13T20:30:59.999Z';
    expect(getDifferenceInHours(startDate2, endDate2)).toBe(10.5);
    const startDate3 = '2024-08-13T10:30:50.395Z';
    const endDate3 = '2024-08-14T11:00:50.395Z';
    expect(getDifferenceInHours(startDate3, endDate3)).toBe(0.5);
  });
});
