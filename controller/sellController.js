const sellmodel = require("../models/sellModel");
exports.addSell = async (req, res, next) => {
    try {
        console.log("imagefilename=", req.files)
        const sellBody = req.body;
        sellBody.images = []
        req.files.forEach(file => {
            const imagefilename = file.filename
            sellBody.images.push("http://localhost:" + process.env.PORT + "/" + imagefilename)

        });

        const createsell = await sellmodel.create(sellBody)


        res.send(createsell)

    } catch (error) {

        res.status(500).send('Something addSell wrong!')
        console.log("err=", error)

    }
}
