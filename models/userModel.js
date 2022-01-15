const mongoose = require("mongoose")
const userSellSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password:String,
  email:String,
  cart: [{
    sell: { type: mongoose.Schema.Types.ObjectId, ref: "sell" }, count: Number
}]

})
const model = mongoose.model("userSell", userSellSchema)

module.exports = model