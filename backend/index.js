// Express is the framework being used to build the REST API.
const express = require("express");

// BodyParser library is required for parsing the input to the backend in the correct format(urlencoded form).

const bodyParser = require('body-parser');

// CORS stands for Cross-Origin-Resource-Sharing. The browser by default blocks intra-port communication.
// We need this package to bypass this setting and allow communication between localhost:5000 and localhost:3000.

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
