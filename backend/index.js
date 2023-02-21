// Express is the framework being used to build the REST API.
const express = require("express");

// BodyParser library is required for parsing the input to the backend in the correct format(urlencoded form).

const bodyParser = require('body-parser');

// CORS stands for Cross-Origin-Resource-Sharing. The browser by default blocks intra-port communication.
// We need this package to bypass this setting and allow communication between localhost:5000 and localhost:3000.

const cors = require("cors");

const mongoose = require("mongoose");

const {generateFile} = require('./generateFile');
const {executeCpp} = require("./executeCpp");
const {executePy} = require("./executePy");

const Job = require("./models/Job");

const app = express();

var PrettyError = require('pretty-error');
var pe = new PrettyError();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/online-code-compiler',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
  console.log("Successfully connected to the MongoDB database!");
   }
  );
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/status", async(req,res) => {
   const jobId = req.query.id;
   if(jobId == undefined){
     return res.status(400).json({success : false, error : "Missing Id query param"});
   }
   try{
     console.log(jobId);
     const job = await new Job.findById(jobId);
     return res.json({GET: "Request!"});
   }catch(err){
     return res.status(400).json({success : false, error : JSON.stringify(err)});
   }
});

/*

Overall, a three-way communication takes place when the user tries to run a code through the client :

- The browser or the client calls the NodeJS backend with a POST request.
- The NodeJS backend calls the System Shell for execution of the code.
- The shell executes the provided code and returns the output to the backend which in turn transmits it to the client.
- Lastly, the output is displayed accordingly.

*/

// This is the post/run route which is responsible for getting the code to the backend.
app.post("/run", async (req,res) => {
   const {language="cpp",code} = req.body;

// The following condition checks if the code body is empty or undefined etc..
   if(!code){
      return res.status(400).json({success: false, error: "Empty code body!"});
   }
  
   let job;

   try{
      
      // This variable would contain the filepath of the code through the client.
      const filepath = await generateFile(language,code);

      job = await new Job({language, filepath}).save();

      // This variable stores the output of the executed code.
      let output;
     
      // job["startedAt"] = new Date();
      // job["submittedAt"] = new Date();
      job["completedAt"] = new Date();
      job["status"] = "success";
      job["output"] = output;
     
      await job.save();

      if(language==="cpp")
      {
         output = await executeCpp(filepath);
      }
      else
      {
         output = await executePy(filepath);
      }
      
      // Both the filepath and the output are returned back to the calling function.
      return res.json({filepath,output});

   }catch(err){
      job["completedAt"] = new Date();
      job["status"] = "error";
      job["output"] = JSON.stringify(err);
      await job.save();
      console.log(job);
      // res.status(500).json({err});
   }
});

// The backend can be made to run on the any desired + available port. Here the port number is 5000.
app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
