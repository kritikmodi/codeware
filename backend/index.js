const express = require("express");

const {generateFile} = require('./generateFile');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req,res) => {
   return res.json({GET: "Request!"});
});

app.post('/run', async (req,res) => {
   const {language,code} = req.body;
   
   if(code === undefined){
      return res.status(404).json({success: false, error: "Empty code body!"});
   }

   const filepath = await generateFile(language, code);
   
   return res.json({filepath});
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
