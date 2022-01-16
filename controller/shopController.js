
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
//getCart
exports.getCart = (req, res) => {
 
    userModel.findById(req.user._id).populate("cart.sell").then((user) => {
        if(!user)
        return res.status(404).send("find not user!")
        
        res.status(200).send(user.cart);
    }).catch((error) => {
        res.status(400).send(" get getCart error " + error);
    });
}
//addcart
exports.addcart = async (req, res, next) => {
    try {
        const body = req.body
        let findUser = await userModel.findById(req.user._id)
        if (!findUser)
            return res.status(401).send("find not user!")

            const foundCartIndex = findUser.cart.findIndex(item => item.sell == body.sell)
               console.log("foundCartindexIndex=", foundCartIndex)
    
                 if (foundCartIndex === -1) {
                    findUser.cart.push({ sell: body.sell, count: body.count })
                 }
                 else {

                    if(body.count===0)
                    findUser.cart.splice(foundCartIndex,1)
                    else
                    findUser.cart[foundCartIndex].count = parseInt(body.count);
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
