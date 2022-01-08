const sellmodel = require("../models/sellModel");
const userModel = require("../models/userModel")
exports.addSell = async (req, res, next) => {
    try {
        console.log("imagefilename=", req.files)
        const sellBody = req.body;
        console.log("req.user=", req.user)
        sellBody.images = []
        sellBody.user = req.user._id
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
//detailSell
exports.detailSell = (req, res) => {
    const { id } = req.params;
    sellmodel.findById(id).then((success) => {
        res.status(200).send(success);
    }).catch((error) => {
        res.status(400).send(" get detailSell error " + error);
    });
}
//getMySell
exports.getMySell = (req, res) => {
    sellmodel.find({ user: req.user._id }).then((success) => {
        res.status(200).send(success);
    }).catch((error) => {
        res.status(400).send(" get getMySell error " + error);
    });
}
//removeMySell

exports.removeMySell = (req, res, next) => {
    const { id } = req.params;
    console.log("iddel=", id)
    sellmodel.findByIdAndRemove(id).then((success) => {
        res.status(200).send(success);
    }
    ).catch(
        (error) => {
            res.status(500).send({ message: "error with DELETE ", objekt: error })
        }
    )
}
/*

exports.removeMySell = async (req, res, next) => {
    try {
  
      let finduser = await userModel.findOne({ _id: req.user.userId })
      if (finduser) {
        if (finduser.userModel.includes(req.params.id)) {
          finduser = finduser.userModel.filter(item => {
  
            return item != req.params.id
  
          })
          await finduser.save()
        }
  
        res.status(200).send(true);
      }
  
    } catch (error) {
      res.status(500).send('Something delete mysell wrong!')
      console.log("error=", error)
  
    }
  }
*/