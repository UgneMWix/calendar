import styles from './Calendar.module.css';
import style from './Events.module.css';
import {
  generateHoursOfTheDay,
  generateWeek,
  getFirstDayOfWeek,
  setHours,
  areDaysTheSame,
  getDateObjectFromString,
  dayArithmetic,
} from '../utils/date';
import { Header } from './Header/Header';
import { TimeLine } from './TimeLine/TimeLine';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import EventObject from '../dbObject';
interface SquareData {
  htmlElement: HTMLDivElement;
  date: string;
}

export function Calendar({
  openModal,
  events,
  chosenDay,
}: {
  openModal: (dateISO?: string) => void;
  events: EventObject[];
  chosenDay: string;
}) {
  const squareRefs = useRef<SquareData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const dateList = useMemo(() => {
    return generateWeek(getFirstDayOfWeek(setHours(chosenDay, 0, 0))).flatMap((value) => generateHoursOfTheDay(value));
  }, [chosenDay]);
  const onSquareClick = (dateISO: string) => {
    openModal(dateISO);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, [chosenDay]);

  return (
    <section className={styles['main-calendar']}>
      <Header chosenDay={chosenDay} />
      <section className={styles['calendar-time-line-and-squares']}>
        <section className={styles['time-line']}>
          <TimeLine />
        </section>
        <section className={styles['time-table']}>
          {dateList.map((value, i) => (
            <Square
              ref={(squareElement) => {
                if (!squareElement) {
                  return;
                }

                if (squareRefs.current.some((data) => data.date === value)) {
                  return;
                }

                squareRefs.current[i] = { htmlElement: squareElement, date: value };
              }}
              onClick={() => onSquareClick(value)}
              key={value}
            />
          ))}
        </section>
      </section>
      {isLoaded &&
        events.map((value) => {
          const square = squareRefs.current.find((square) => {
            return areDaysTheSame(value.eventStart, square.date, true);
          });
          console.log(!!square);
          if (!square) return null;

          return (
            <Event
              key={value.id}
              square={square}
              text={value.title}
              startDateISO={value.eventStart}
              endDateISO={value.eventEnd}
              weekList={dateList}
            />
          );
        })}
    </section>
  );
}

interface SquareProps {
  onClick: () => void;
}

const Square = forwardRef<HTMLDivElement, SquareProps>(({ onClick }, ref) => {
  return <div ref={ref} className={styles['calendar-square']} onClick={onClick}></div>;
});
function Event({
  square,
  text,
  startDateISO,
  endDateISO,
  weekList,
}: {
  square: SquareData;
  text: string;
  startDateISO: string;
  endDateISO: string;
  weekList: Array<string>;
}) {
  const rect = square.htmlElement.getBoundingClientRect();
  const startDate = getDateObjectFromString(startDateISO);
  const endDate = getDateObjectFromString(endDateISO);
  let days = Math.abs(startDate.getUTCDate() - endDate.getUTCDate()) + 1; //what if month different
  if (endDate > new Date(weekList[weekList.length - 1]))
    days -= Math.abs(new Date(weekList[weekList.length - 1]).getDate() - endDate.getDate()) + 1;
  let tempTop = rect['top'] + (rect['height'] * startDate.getUTCMinutes()) / 60;
  if (startDate.toLocaleDateString() !== endDate.toLocaleDateString()) {
    let tempEndDate = getDateObjectFromString(endDateISO);
    tempEndDate.setUTCHours(23, 59, 59, 99);
    let tempStartDate = getDateObjectFromString(startDateISO);
    let leftMargin = rect['left'];

    const eventSquares = Array.from({ length: days }, (_, i) => {
      if (i === days - 1 && tempEndDate.getDate() === endDate.getDate() + 1) {
        tempEndDate = getDateObjectFromString(endDateISO);
      }
      if (i === 0) {
        tempStartDate = getDateObjectFromString(startDateISO);
      }
      const position = getPosition(rect['height'], rect['width'], tempTop, leftMargin, tempStartDate, tempEndDate);
      leftMargin += rect['width'];

      dayArithmetic(tempEndDate.toISOString(), i + 1);
      dayArithmetic(tempStartDate.toISOString(), i + 1);
      tempStartDate = getDateObjectFromString(setHours(tempStartDate.toISOString(), 0, 0));
      tempTop = rect['top'] - startDate.getUTCHours() * rect['height'];
      return (
        <div className={style.event} style={position} key={i}>
          {text}
        </div>
      );
    });
    return eventSquares;
  } else {
    const position = getPosition(rect['height'], rect['width'], rect['top'], rect['left'], startDate, endDate);
    return (
      <div className={style.event} style={position}>
        {text}
      </div>
    );
  }
}
function getPosition(
  rectHeight: number,
  rectWidth: number,
  rectTop: number,
  rectLeft: number,
  startDate: Date,
  endDate: Date,
) {
  return {
    height:
      (rectHeight * endDate.getUTCMinutes()) / 60 +
      rectHeight * (endDate.getUTCHours() - startDate.getUTCHours()) -
      (rectHeight * startDate.getUTCMinutes()) / 60,
    width: rectWidth - 15,
    top: rectTop,
    left: rectLeft,
  };
}
