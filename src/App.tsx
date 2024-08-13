import Header from './Header/Header';
import './stylesheets/reset.css';
import './stylesheets/global.css';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from './Modal/Modal';
import EventObject from './dbObject';
import { isInChosenWeek, getFirstDayOfWeek } from './utils/date';
import Sidebar from './Sidebar/Sidebar';
import { Calendar } from './Calendar/Calendar';
import cn from 'classnames';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [refDateISO, setRefDateISO] = useState<string | undefined>();
  const [events, setEvents] = useState<EventObject[]>([]);
  const [chosenDay, setChosenDay] = useState(new Date().toISOString());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);
  const openModal = useCallback((dateISO?: string) => {
    setIsOpen(true);
    setRefDateISO(dateISO);
  }, []);

  const saveToStorage = useCallback((newObject: EventObject) => {
    saveEvent(newObject).then(getEvents).then(setEvents);
  }, []);
  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, [chosenDay]);

  const toggleDarkmode = useCallback(() => {
    setIsDarkMode((currentValue) => !currentValue);
  }, []);
  const clearServer = useCallback(() => {
    clearEvents();
    setEvents([]);
  }, []);
  return (
    <div className={cn('root', { darkmode: isDarkMode })}>
      <Header
        clearEvents={clearServer}
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
        toggleDarkmode={toggleDarkmode}
      />
      <main>
        <Sidebar toggleModal={toggleModal} setChosenDay={setChosenDay} />
        <Calendar
          openModal={openModal}
          events={events.filter(
            (event) =>
              isInChosenWeek(getFirstDayOfWeek(chosenDay), event.eventStart) ||
              isInChosenWeek(getFirstDayOfWeek(chosenDay), event.eventEnd),
          )}
          chosenDay={chosenDay}
        />
      </main>
      {isOpen && <Modal toggleModal={toggleModal} eventDate={refDateISO} saveToStorage={saveToStorage} />}
    </div>
  );
}

export default App;

function getEvents() {
  const eventsFetch = fetch('http://localhost:3000/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return eventsFetch.then((response) => response.json()) as Promise<EventObject[]>;
}
function saveEvent(newEvent: EventObject) {
  return fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });
}
async function clearEvents() {
  const events = await getEvents();
  for (const entry of events) {
    await fetch(`http://localhost:3000/events/${entry.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
