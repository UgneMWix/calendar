import styles from './stylesheets/Calendar.module.css';
import GenerateWeekTitle from './GenerateWeekTitle';

function Calendar() {
  function generateSquare(i: string, j: string, k: number) {
    return <div className={styles['calendar-square']} data-hour={i} data-day={j} key={k}></div>;
  }
  function generateGrid() {
    const grid = [];
    let k = 0;
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 7; j++) {
        grid.push(generateSquare(i.toString(), j.toString(), k));
        k++;
      }
    }
    return grid;
  }
  function generateTimeLine() {
    const timeline = [];
    for (let i = 0; i < 24; i++) {
      const zero = i < 10 ? '0' : '';
      timeline.push(
        <div className={styles['calendar-time-line']} key={i}>
          <p className={styles['label']}>
            {zero}
            {i}:00
          </p>
        </div>,
      );
    }
    return timeline;
  }
  function generateHeaderElement(day: string, i: number) {
    return (
      <div className={styles['main-calendar-day']} key={i}>
        <p className={styles['main-calendar-day-name']}>{day.substring(0, 3)}</p>
        <GenerateWeekTitle date={getWeek(new Date())[i]} />
      </div>
    );
  }
  function generateHeader() {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const header = [];
    for (let i = 0; i < weekDays.length; i++) {
      header.push(generateHeaderElement(weekDays[i], i));
    }
    return header;
  }
  function getWeek(fromDate: Date) {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay())),
      result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday));
    }
    return result;
  }
  //   function getWeekDays(fromDate: Date) {
  //     const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay())),
  //       result = [new Date(sunday).getDate()];
  //     while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
  //       result.push(new Date(sunday).getDate());
  //     }
  //     return result;
  //   }

  return (
    <section className={styles['main-calendar']}>
      <header className={styles['main-calendar-header']}>{generateHeader()}</header>
      <section className={styles['calendar-time-line-and-squares']}>
        <section className={styles['time-line']}>{generateTimeLine()}</section>
        <section className={styles['time-table']}>{generateGrid()}</section>
      </section>
    </section>
  );
}
export default Calendar;
