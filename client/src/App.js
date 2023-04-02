// This is the main file of the frontend.

import './App.css';
// 'useState' hooks are used for storing and updating a variables value based on certain conditions.
import React, {useState, useEffect} from 'react';
// 'Axios' is a promised based HTTP client for Javascript which is used to handle HTTP requests.
import axios from 'axios';

import stubs from './defaultStubs';

function App() {

  // This useState hook is used for saving the code state.
  const [code,setCode] = useState("null");
  // This useState hook is used for updating the programming language for the compiler.
  const [language,setLanguage] = useState("cpp");
  // This useState hook is used for updating the output once computed.
  const [output,setOutput] = useState("null");
  const [status, setStatus] = useState("pending");
  const [jobId, setjobId] = useState("default");
  
  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  const handleSubmit = async () => {

    const payload = {
      language,
      code
    };
    
    try{
      setJobId(jobId);
      setStatus(jobStatus);
      setOuput(output);
      const {data} = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      setJobId(data.jobId);
      
      let intervalId;
      
      intervalId = setInterval(async () => {
        const {data: dataRes} = await axios.get("http://localhost:5000/status",{params: {id: data.jobId}});
        const {success,job,error} = dataRes;
        if(success){
          const {status: jobStatus, output: jobOutput} = job;
          setStatus(jobStatus);
          if(jobStatus === "pending")
            return ;
          setOutput(jobOutput);
          clearInterval(intervalId);
        }else{
          setStatus("Error! Please retry!");
          console.error(error);
          setOutput(error);
        }
        console.log(dataRes);},1000);
      
    }catch({response}){
      if(response){
        const errMsg=response.data.err.stderr;
        setOutput(errMsg);
      }
      else{
        setOutput("Error connecting to server!");
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
        <select value={language} onChange={(e)=>{
          let response = window.confirm("WARNING! Your current code will be lost if you switch your language.");
          setLanguage(e.target.value);
          if(response)
          setLanguage(e.target.value);
          }}>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br/>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value);}} placeholder="Type your code here"></textarea>
      <br/><br/><br/>
      <button onClick={handleSubmit}>Run code</button>
      <p>{status}</p>
      <p>{jobId && `jobID:${jobId}`}</p>
      <p>{output}</p>
    </div>
  );

}

// The 'default' keyword is used only once to export a particular function or variable without having to use {}.
export default App;
