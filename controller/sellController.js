const sellmodel = require("../models/sellModel");
exports.addSell = async (req, res, next) => {
    try {

        const sellBody = req.body;
        const createsell = await sellmodel.create(sellBody)
        res.send(createsell)

    } catch (error) {

        res.status(500).send('Something addSell wrong!')
        console.log("err=",error)

    }
}
