
require("dotenv").config();

var express = require('express');
var path = require('path');
const app = express();
const cors = require("cors")
const sellRoute=require("./routes/sellRoute")
const verbindeDB = require("./mongo-db");

verbindeDB()


app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));



app.use(express.static('uploads'))
app.use(express.static('public'))
app.use("/sell",sellRoute)
app.get('*', (req,res, next) =>{
    res.status(404).send("Diesen Pfad gibt es nicht")
   
    
  })
  
 
  
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log("Läuft auf Port" + port) })

