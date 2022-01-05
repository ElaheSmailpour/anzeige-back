const categorymodel = require("../models/category");
exports.addcategory = (req, res) => {

    const body = req.body;

    categorymodel.create(body).then(
        (success) => {

            res.status(201).send(success);
        }
    ).catch((error) => {
        res.status(500).send(" create category error " + error);
    });
}

exports.getcategory = (req, res) => {
    categorymodel.find().then((success) => {
        res.status(200).send(success);
    }).catch((error) => {
        res.status(400).send(" get category error " + error);
    });
}