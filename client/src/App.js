import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [code,setCode] = useState("");
  const [output,setOutput] = useState("");

  const handleSubmit = async () => {

    const payload = {
      language : "cpp",
      code
    };
    
    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    }catch(err){
      console.log(err.response);
    }
  }

  return (
    <div className="App">
      <br/>
      <h1>Codeware</h1>
      <br/>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value);}} placeholder="Type your code here"></textarea>
      <br/><br/><br/>
      <button onClick={handleSubmit}>Run code</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
