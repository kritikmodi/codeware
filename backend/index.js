const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const {generateFile} = require('./generateFile');
const {executeCpp} = require("./executeCpp");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req,res) => {
   return res.json({GET: "Request!"});
});

// A three-way communication takes place :

// The browser or the client calls the NodeJS backend with a POST request.
// The NodeJS backend calls the System Shell for execution of the code.
// The shell executes the provided code and returns the output to the backend which in turn transmits it to the client.
// Lastly, the output is displayed accordingly.

app.post("/run", async (req,res) => {
   const {language="cpp",code} = req.body;

   if(!code){
      return res.status(400).json({success: false, error: "Empty code body!"});
   }

   try{
      
      const filepath = await generateFile(language,code);

      const output = await executeCpp(filepath);

      return res.json({filepath,output});

   }catch(err){
      res.status(500).json({err});
   }
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
