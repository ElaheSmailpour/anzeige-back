
const sellModel = require("../models/sellModel");

const userModel = require("../models/userModel");
//getShop

exports.getShop = (req, res) => {
    sellModel.find().populate("category").then((success) => {
        res.status(200).send(success);
    }).catch((error) => {
        res.status(400).send(" get getShop error " + error);
    });
}
//addcart
exports.addcart = async (req, res, next) => {
    try {
        const body = req.body
        let findUser = await userModel.findById(req.user._id)
        if (!findUser)
            return res.status(401).send("find not user!")

            const foundCartindexIndex = findUser.cart.findIndex(item => item.sell == body.sell)
               console.log("foundCartindexIndex=", foundCartindexIndex)
    
                 if (foundCartindexIndex === -1) {
                    findUser.cart.push({ sell: body.sell, count: body.count })
                 }
                 else {
                    findUser.cart[foundCartindexIndex].count = parseInt(body.count);
               }
        await findUser.save()
        res.status(200).send(findUser);
        // let finduser = await userModel.findOne({ _id: req.user.userId })
        // if (finduser) {
        //     const { productid, count } = req.body;
        //     const foundProductIndex = finduser.cart.findIndex(item => item.product == productid)
        //     console.log("foundProductIndex=", foundProductIndex)

        //     if (foundProductIndex === -1) {
        //         finduser.cart.push({ product: productid, count: count })
        //     }
        //     else {
        //         finduser.cart[foundProductIndex].count = parseInt(count);
        //     }
        //     await finduser.save()
        // }
        // res.status(200).send(finduser);


    } catch (error) {

        res.status(500).send('Something addcart wrong!')
        console.log("erroraddcard=", error)
    }
}
