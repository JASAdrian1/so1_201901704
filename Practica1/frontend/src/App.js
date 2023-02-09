import logo from './logo.svg';
import './App.css';
import Calculadora from './components/Calculadora';
import { useState } from 'react';
import Log from './components/Log';

function App() {
  const [logs, setLogs] = useState(false)

  const handleView = (verLogs) =>{
      setLogs(verLogs)
  }

  return (
    <div className="App">
      <div className='botones'>
        <button className='boton' onClick={()=>handleView(true)}>Calculadora</button>
        <button className='boton' onClick={()=>handleView(false)}>Logs</button>
      </div>
      <div>     
        {logs && <Calculadora />}
        {logs || <Log />}
      </div>
    </div>
  );
}

export default App;
