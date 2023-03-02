import './App.css';
import React, { useState } from 'react';
import ModalButton from './Components/Base/Button';
import Popup from './Components/Model/Model';


function App() {

  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  function closePopup() {
    setShowPopup(false);
  }   
  return (
    <div className="App">
      <header className="App-header">
      <div className="app">
      <button onClick={togglePopup}>Open Popup</button>
      {showPopup && <Popup onClose={closePopup} />}
    </div>
      </header>
    </div>
  );
}

export default App;
