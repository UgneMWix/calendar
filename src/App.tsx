import Header from './Header/Header';
import MainScreen from './MainScreen/MainScreen';
import './stylesheets/reset.css';
import './stylesheets/global.css';
import { useState } from 'react';
import { Modal } from './Modal/Modal';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  // const [startInput, setStartInput] = useState('');
  // const [endInput, setEndInput] = useState('');
  // const [dateInput, setDateInput] = useState('');
  function openCloseModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Header />
      <MainScreen callback={openCloseModal} />
      {isOpen && (
        <Modal
          callback={openCloseModal}
          // passStartInput={setStartInput}
          // passEndInput={setEndInput}
          // passDateInput={setDateInput}
        />
      )}
    </>
  );
}

export default App;
