const express = require("express");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
   return res.json({GET: "Request!"});
});

app.post('/run', async (req,res) => {
   const {language,code} = req.body;
   language = "java";
   
   if(code === undefined){
      return res.status(404).json({success: false, error: "Empty code body!"});
   }
   
   return res.json({language, code});
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
