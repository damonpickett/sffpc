import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Modal from './components/Modal';
import Minter from './components/Minter';
import About from './components/About';
import Footer from './components/Footer';
import spaceOdyssey from './images/2001-330x505.png'
import './App.css';

function App() {

  const [accounts, setAccounts] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="App">
        <Header accounts={accounts} setAccounts={setAccounts} modal={modal} setModal={setModal} />
        <Modal modal={modal} setModal={setModal} />
        <Routes>
          <Route path='/' element={<Minter accounts={accounts} setAccounts={setAccounts} />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
        <Footer />
      </div>
      <div className='background'></div>
    </>
  );
}

export default App;
