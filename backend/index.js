const express = require("express");

const {generateFile} = require('./generateFile');
const {executeCpp} = require("./executeCpp");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
   return res.json({GET: "Request!"});
});

app.post('/run', async (req,res) => {
   const {language,code} = req.body;
   
   if(code === undefined){
      return res.status(404).json({success: false, error: "Empty code body!"});
   }

   try{
      const filepath = await generateFile(language, code);
      const output = await executeCpp(filepath);
      return res.json({filepath,output});
   }catch(err){
      res.status(500).json({err});
   }

});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
