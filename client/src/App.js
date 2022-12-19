import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [code,setCode] = useState('');

  const handleSubmit = async () => {

    const payload = {
      language : "cpp",
      code
    };
    
    const {data} = await axios.post("https://localhost:5000/run", payload);
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
