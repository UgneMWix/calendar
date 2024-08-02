import Header from './Header/Header';
import MainScreen from './MainScreen/MainScreen';
import './stylesheets/reset.css';
import './stylesheets/global.css';
import { useCallback, useState } from 'react';
import { Modal } from './Modal/Modal';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [refDateISO, setRefDateISO] = useState<string | undefined>();

  const toggleModal = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);
  const openModal = useCallback((dateISO?: string) => {
    setIsOpen(true);
    setRefDateISO(dateISO);
  }, []);
  return (
    <>
      <Header />
      <MainScreen openModal={openModal} toggleModal={toggleModal} />
      {isOpen && <Modal toggleModal={toggleModal} eventDate={refDateISO} />}
    </>
  );
}

export default App;
