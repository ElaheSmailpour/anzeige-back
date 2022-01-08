
const auth=require("../middelware/auth")
const mullterMiddelware=require("../middelware/multerMiddelware")
const express = require('express')

const router = express.Router()

const {addSell,getMySell,removeMySell,detailSell}=require("../controller/sellController")

router.get("/detailSell/:id",detailSell)
router.delete("/removeSell/:id",auth,removeMySell)
router.get("/getMySell",auth,getMySell)
router.post("/addSell",[mullterMiddelware.array("images",4),auth],addSell)




module.exports=router