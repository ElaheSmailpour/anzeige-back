const auth=require("../middelware/auth")
const express = require('express')

const router = express.Router()

const {getShop,addcart}=require("../controller/shopController")



router.get("/getShop",getShop)
router.post("/addcart",auth,addcart)



module.exports=router