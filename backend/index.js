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

app.post("/run", (req,res) => {
   console.log(req.body);
   return res.json(req.body);
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
