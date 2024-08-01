import Header from './Header/Header';
import MainScreen from './MainScreen/MainScreen';
import './stylesheets/reset.css';
import './stylesheets/global.css';
import { useState } from 'react';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header />
      <MainScreen />
      {isOpen && <div>Modal</div>}
    </>
  );
}

export default App;
