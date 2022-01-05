

const mullterMiddelware=require("../middelware/multerMiddelware")
const express = require('express')

const router = express.Router()

const {addSell}=require("../controller/sellController")



router.post("/addSell",mullterMiddelware.array("images",4),addSell)




module.exports=router