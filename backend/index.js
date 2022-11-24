const express = require("express");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
   return res.json({GET: "Request!"});
});

app.post('/run', (req,res) => {
   const language = req.body.language;
   const code = req.body.code;
   const {language,code} = req.body;
   return res.json(req.body);
});

app.listen(5000, () => {
   console.log('Listening on port 5000!');
});
