const mongoose = require("mongoose")
const userSellSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password:String,
  email:String

})
const model = mongoose.model("userSell", userSellSchema)

module.exports = model