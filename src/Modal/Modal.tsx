import { Alert } from './Alert/Alert';
import styles from './Modal.module.css';
import { useState } from 'react';
import dbObject from '../dbObject';
interface props {
  toggleModal: () => void;
  eventDate?: string;
  saveToStorage: (newEvent: dbObject) => void;
}

export function Modal(props: props) {
  const [eventTitle, setEventTitle] = useState('');
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [startInput, setStartInput] = useState(() => {
    if (props.eventDate) return `${new Date(props.eventDate).getUTCHours().toString().padStart(2, '0')}:00`;
    return '';
  });
  const [endInput, setEndInput] = useState(() => {
    if (props.eventDate) return `${startInput.substring(0, 2)}:30`;
    return '';
  });
  const [dateInput, setDateInput] = useState(() => {
    if (props.eventDate) return `${props.eventDate.substring(0, 10)}`;
    return '';
  });
  const [endDateinput, setEndDateInput] = useState(() => {
    if (props.eventDate) return `${props.eventDate.substring(0, 10)}`;
    return '';
  });
  const [descriptionInput, setDescriptionInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  function openAlerts() {
    setAlertIsOpen(true);
  }
  function validateTitleInput() {
    if (eventTitle === '') {
      return false;
    } else {
      return true;
    }
  }
  function validateTimeInput() {
    if (startInput === '' || endInput === '' || dateInput === '' || startInput >= endInput) {
      return false;
    }
    return true;
  }
  function handleClick() {
    // validateTitleInput() && validateTimeInput() ? props.toggleModal() : openAlerts();
    if (!validateTitleInput() || !validateTimeInput()) {
      openAlerts();
      return;
    }
    const startDate = new Date(dateInput);
    startDate.setUTCHours(parseInt(startInput.substring(0, 2)), parseInt(startInput.substring(3, 5)), 0, 0);
    const endDate = new Date(endDateinput);
    endDate.setUTCHours(parseInt(endInput.substring(0, 2)), parseInt(endInput.substring(3, 5)), 0, 0); //sudeti i utils
    console.log(endDate);
    // console.log(startDate);
    const newEvent: dbObject = {
      title: eventTitle,
      date: dateInput,
      eventStart: startDate.toISOString(),
      eventEnd: endDate.toISOString(),
      startTime: startInput,
      endTime: endInput,
      description: descriptionInput,
      location: locationInput,
    };
    props.saveToStorage(newEvent);
    props.toggleModal();
  }
  return (
    <div>
      <section className={styles.modal}>
        <header className={styles['modal-header']}>
          <button className={styles['modal-close-button']} onClick={props.toggleModal}>
            ✕
          </button>
        </header>
        <main className={styles['modal-main']}>
          <div className={styles['input-container']}>
            <input
              placeholder="Enter Title"
              className={styles['input-field']}
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <label className={styles['input-label']}>Enter Title</label>
            <span className={styles['input-highlight']}></span>
          </div>
          {alertIsOpen && <Alert text="Please enter a title" />}
          <section className={styles['modal-time-flex-box']}>
            <img src="/clock.png" alt="clock icon" className={styles['modal-icons']} />
            <input
              className={styles['modal-time-date']}
              type="date"
              id="date-input"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <input
              className={styles['modal-time-start']}
              type="time"
              id="start-input"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
            />
            <p className={styles.dash}>-</p>
            <input
              className={styles['modal-time-date']}
              type="date"
              id="date-input-end"
              value={endDateinput}
              onChange={(e) => setEndDateInput(e.target.value)}
            />
            <input
              className={styles['modal-time-end']}
              type="time"
              id="end-input"
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
            />
          </section>
          {alertIsOpen && (
            <Alert
              text="Start time must come before the end time and must not be
                empty"
            />
          )}
          <section className={styles['modal-location-flex-box']}>
            <img src="/location.png" alt="Location pin icon" className={styles['modal-icons']} />
            <input
              placeholder="Add location"
              className={styles['modal-location-text']}
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </section>
          <section className={styles['modal-description-flex-box']}>
            <img src="/left-align.png" alt="left-aligned text icon" className={styles['modal-icons']} />
            <input
              className={styles['modal-description-text']}
              placeholder="Add description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </section>
        </main>

        <footer className={styles['modal-footer']}>
          <button className={styles['modal-save-button']} onClick={handleClick}>
            Save
          </button>
        </footer>
      </section>
      <div className={styles['overlay']}></div>
    </div>
  );
}
