const auth=require("../middelware/auth")
const express = require('express')

const router = express.Router()

const {getShop,addcart,getCart}=require("../controller/shopController")


router.get("/getCart",auth,getCart)
router.get("/getShop",getShop)
router.post("/addcart",auth,addcart)



module.exports=router