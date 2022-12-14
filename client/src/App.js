import './App.css';
import React, {useState} from 'react';

function App() {

  const [code,setCode] = useState('');

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea rows="20" cols="75"></textarea>
      <br/>
      <button>Submit</button>
    </div>
  );
}

export default App;
