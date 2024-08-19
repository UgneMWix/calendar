import styles from './Calendar.module.css';
import style from './Events.module.css';
import {
  generateHoursOfTheDay,
  generateWeek,
  getFirstDayOfWeek,
  setTime,
  areDaysTheSame,
  getDateObjectFromString,
  dayArithmetic,
  getLengthOfEvent,
  howManyDaysUntilEndOfWeek,
  getDifferenceInHours,
  getTimeFromDate,
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
    return generateWeek(getFirstDayOfWeek(setTime(chosenDay, 0, 0, 0, 0))).flatMap((value) =>
      generateHoursOfTheDay(value),
    );
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
  if (getLengthOfEvent(startDateISO, endDateISO) > 1)
    return (
      <MultiDayEvent
        text={text}
        startDateISO={startDateISO}
        endDateISO={endDateISO}
        rect={rect}
        startDate={startDate}
        endDate={endDate}
        weekList={weekList}
      />
    );

  const position = getPosition(rect['height'], rect['width'], rect['top'], rect['left'], startDate, endDate);
  return (
    <div className={style.event} style={position}>
      {text}
    </div>
  );
}

function MultiDayEvent({
  text,
  startDateISO,
  endDateISO,
  rect,
  startDate,
  endDate,
  weekList,
}: {
  text: string;
  startDateISO: string;
  endDateISO: string;
  rect: DOMRect;
  startDate: Date;
  endDate: Date;
  weekList: Array<string>;
}) {
  let days = getLengthOfEvent(startDateISO, endDateISO);
  if (endDate > new Date(weekList[weekList.length - 1])) days = days - howManyDaysUntilEndOfWeek(startDateISO) + 1;
  const DAY_LENGTH_HOURS = 24;
  const EVENT_WIDTH = rect.width - 15;
  const eventSquares = Array.from({ length: days }, (_, i) => {
    const currentEventDay = dayArithmetic(startDateISO, i);

    if (areDaysTheSame(startDateISO, currentEventDay)) {
      const height = rect.height * getDifferenceInHours(startDateISO, setTime(startDateISO, 23, 59, 59, 999));
      const top = rect['top'] + (rect['height'] * getTimeFromDate(startDateISO).hours) / 60;
      const left = rect['left'];
      return (
        <div className={style.event} style={{ height, width: EVENT_WIDTH, top, left }} key={i}>
          {text}
        </div>
      );
    } else if (areDaysTheSame(endDateISO, currentEventDay)) {
      const height = rect.height * getDifferenceInHours(setTime(endDateISO, 0, 0, 0, 0), endDateISO);
      const top = rect.top - rect.height * startDate.getUTCHours();
      const left = rect.left + rect.width * i;
      return (
        <div className={style.event} style={{ height, width: EVENT_WIDTH, top, left }} key={i}>
          {text}
        </div>
      );
    } else {
      const height = DAY_LENGTH_HOURS * rect.height;
      const top = rect.top - rect.height * startDate.getUTCHours();
      const left = rect.left + rect.width * i;

      return (
        <div className={style.event} style={{ height, width: EVENT_WIDTH, top, left }} key={i}>
          {text}
        </div>
      );
    }
  });
  return eventSquares;
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
