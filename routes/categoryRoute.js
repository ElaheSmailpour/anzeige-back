
const express = require('express')

const router = express.Router()

const {getcategory,addcategory}=require("../controller/categoryController")

router.post("/addcategory",addcategory)

router.get("/getcategory",getcategory)




module.exports=router