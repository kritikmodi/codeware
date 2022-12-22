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
      console.log({data});
      setOutput(data.output);
    }catch(err){
      
    }
  }

  return (
    <div className="App">
      <br/>
      <h1>Online Code Compiler</h1>
      <br/>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value);}}></textarea>
      <br/><br/><br/>
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
