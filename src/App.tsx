import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/header';
import Main from './Component/Content/main';
import Navigation from './Component/Navigation/NaviagationTemplate/Navigation';

function App() {
  return (
    <div className="App">
      <div className="blur"></div>
      <Navigation/>
      <Main/>
    </div>
  );
}

export default App;
