import React , {useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Component/Content/main';
import Navigation from './Component/Navigation/NaviagationTemplate/Navigation';
import SideSelection from './Context'

function App() {
  const [selected, setSelect] = useState<string>("");

  return (
    <div className="App">
      <div className="blur"></div>
      <div className="form">
        <Navigation setItem = {setSelect}/>
        <SideSelection.Provider value ={selected}>
          <Main/>
        </SideSelection.Provider>
      </div>
    </div>
  );

}

export default App;
