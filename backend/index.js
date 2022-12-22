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

app.post("/run", async (req,res) => {
   const {language="cpp",code} = req.body;

   if(!code){
      return res.status(400).json({success: false, error: "Empty code body!"});
   }

   const filepath = await generateFile(language,code);

   return res.json({filepath});
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
