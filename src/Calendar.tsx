import styles from './App.module.css';
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
  return (
    <>
      <section className={styles['main-calendar']}>
        <header className={styles['main-calendar-header']}></header>
        <section className={styles['calendar-time-line-and-squares']}>
          <section className={styles['time-line']}>{generateTimeLine()}</section>
          <section className={styles['time-table']}>{generateGrid()}</section>
        </section>
      </section>
    </>
  );
}
export default Calendar;
