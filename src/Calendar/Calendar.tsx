import styles from './Calendar.module.css';
import style from './Events.module.css';
import { generateHoursOfTheDay, generateWeek, getFirstDayOfWeek } from '../utils/date';
import { Header } from './Header/Header';
import { TimeLine } from './TimeLine/TimeLine';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import EventObject from '../dbObject';
interface SquareData {
  htmlElement: HTMLDivElement;
  date: string;
}

export function Calendar({ openModal, events }: { openModal: (dateISO?: string) => void; events: EventObject[] }) {
  const squareRefs = useRef<SquareData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const dateList = useMemo(() => {
    const initialDate = new Date();
    initialDate.setUTCHours(0, 0, 0, 0);
    return generateWeek(getFirstDayOfWeek(initialDate.toISOString())).flatMap((value) => generateHoursOfTheDay(value));
  }, []);
  const onSquareClick = (dateISO: string) => {
    openModal(dateISO);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <section className={styles['main-calendar']}>
      <Header />
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
          const date = new Date(value.eventStart);
          const year = date.getUTCFullYear();
          const month = date.getUTCMonth();
          const day = date.getUTCDate();
          const hour = date.getUTCHours();
          const square = squareRefs.current.find((square) => {
            const dateSquare = new Date(square.date);
            const yearSquare = dateSquare.getUTCFullYear();
            const monthSquare = dateSquare.getUTCMonth();
            const daySquare = dateSquare.getUTCDate();
            const hourSquare = dateSquare.getUTCHours();
            return year === yearSquare && month === monthSquare && day === daySquare && hour === hourSquare;
          });
          if (!square) return null;

          return (
            <Event
              key={value.id}
              square={square}
              text={value.title}
              startDateISO={value.eventStart}
              endDateISO={value.eventEnd}
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
}: {
  square: SquareData;
  text: string;
  startDateISO: string;
  endDateISO: string;
}) {
  const rect = square.htmlElement.getBoundingClientRect();
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  const position = {
    height:
      (rect['height'] * endDate.getUTCMinutes()) / 60 +
      rect['height'] * (endDate.getUTCHours() - startDate.getUTCHours()) -
      (rect['height'] * startDate.getUTCMinutes()) / 60,
    width: rect['width'],
    top: rect['top'] + (rect['height'] * startDate.getUTCMinutes()) / 60,
    left: rect['left'],
  };
  return (
    <div className={style.event} style={position}>
      {text}
    </div>
  );
}
