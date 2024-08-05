import Header from './Header/Header';
import MainScreen from './MainScreen/MainScreen';
import './stylesheets/reset.css';
import './stylesheets/global.css';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from './Modal/Modal';
import EventObject from './dbObject';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [refDateISO, setRefDateISO] = useState<string | undefined>();
  const [events, setEvents] = useState<EventObject[]>([]);

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
  }, []);

  const clearServer = useCallback(() => {
    clearEvents();
    setEvents([]);
  }, []);
  return (
    <>
      <Header clearEvents={clearServer} />
      <MainScreen openModal={openModal} toggleModal={toggleModal} events={events} />
      {isOpen && <Modal toggleModal={toggleModal} eventDate={refDateISO} saveToStorage={saveToStorage} />}
    </>
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
