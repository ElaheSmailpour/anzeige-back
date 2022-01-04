const mongoose = require("mongoose")
const sellSchema = new mongoose.Schema({
    name: String,
    phone: String,
    title: String,
    price: Number,
    description: String,
    image: String,
    //  category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "category"

    //  },
    category:String,
    selltype: { enum: ["request", "bid"], type: String },
    locationType: { enum: ["private", "commercial"], type: String }

})
const model = mongoose.model("sell", sellSchema)

module.exports = model