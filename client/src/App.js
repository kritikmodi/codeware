// This is the main file of the frontend.

import './App.css';
// 'useState' hooks are used for storing and updating a variables value based on certain conditions.
import React, {useState} from 'react';
// 'Axios' is a promised based HTTP client for Javascript which is used to handle HTTP requests.
import axios from 'axios';

function App() {

  // This useState hook is used for saving the code state.
  const [code,setCode] = useState("");
  // This useState hook is used for updating the output once computed.
  const [output,setOutput] = useState("");
  // This useState hook is used for updating the programming language for the compiler.
  const [language,setLanguage] = useState("cpp");

  const handleSubmit = async () => {

    const payload = {
      language : "cpp",
      code
    };
    
    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    }catch({response}){
      if(response){
        const errMsg=response.data.err.stderr;
        setOutput(errMsg);
      }
      else{
        window.alert("Error connecting to server!");
      }
    }
  }

  // The function App() returns a HTML snippet, the one which would be displayed on the landing page of the website.
  return (
    <div className="App">
      <br/>
      <h1>Codeware</h1>
      <br/>
      <div>
        <label>Language : </label>
        <select value={language} onChange={(e)=>{setLanguage(e.target.value);
        console.log(e.target.value);}}>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br/>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value);}} placeholder="Type your code here"></textarea>
      <br/><br/><br/>
      <button onClick={handleSubmit}>Run code</button>
      <p>{output}</p>
    </div>
  );
}


// The 'default' keyword is used only once to export a particular function or variable without having to use {}.
export default App;
