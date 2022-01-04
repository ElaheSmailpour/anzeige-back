//const auth=require("../middelware/Auth")
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
const express = require('express')

const router = express.Router()

const {addSell}=require("../controller/sellController")



router.post("/addSell",addSell)




module.exports=router