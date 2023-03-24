// Express is the framework being used to build the REST API.
const express = require("express");

// BodyParser library is required for parsing the input to the backend in the correct format(urlencoded form).

const bodyParser = require('body-parser');

// CORS stands for Cross-Origin-Resource-Sharing. The browser by default blocks intra-port communication.
// We need this package to bypass this setting and allow communication between localhost:5000 and localhost:3000.

const cors = require("cors");

const mongoose = require("mongoose");

const {generateFile} = require('./generateFile');

const {addJobToQueue} = require("./jobQueue");

const Job = require("./models/Job");

const app = express();

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/online-code-compiler',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err)=>{
    if(err){
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
   console.log("status requested", jobID);
   if(jobId == undefined){
     return res.status(400).json({success : false, error : "Missing Id query param"});
   }
   try{
     const job = await Job.findById(jobId);
     if(job == undefined){
       return res.status(404).json({success : false, error : "Invalid job Id"});
     }
     return res.status(200).json({success : true, job});
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
     
      const jobId = job["_id"];
      addJobToQueue(jobId);
      console.log(job);
     
      res.status(201).json({success: true, jobId});
     
      }catch(err){
        return res.status(500).json({success: false, err: JSON.stringify(err)});
      }
});

// The backend can be made to run on the any desired + available port. Here the port number is 5000.
app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
