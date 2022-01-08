const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const validateRegister = require("../validators/user.schema");
//login

exports.loginUser = async (req, res, next) => {
	let loginuser = req.body
	
	try {

		let user = await userModel.findOne({ username: loginuser.username })
		console.log(user);

		if (user === null) {
			return res.status(401).send('incorrect username')
		}

		let comparePasswort = await bcrypt.compare(loginuser.password, user.password)

		if (comparePasswort) {

			let token = jwt.sign({
				username: user.username,
				_id: user._id,
			}, process.env.JWT,{expiresIn:"2h"})
			res.status(200).json({
				message: 'You are log it',
				token: token,
				username: user.username,
				name:user.name

			})
		} else {
			res.status(401).send('You are  not log it')
		}
	} catch (error) {
		res.status(401).send('You could not be logged in')
	}
}
//signup

exports.signupUser = async (req, res, next) => {

    try {
        const newuser = req.body
        const { error } = validateRegister.validate(newuser)
        if (error)
            return res.status(400).send(error)
        let alreadyuser = await userModel.find({ $or: [{ email: newuser.email }, { phone: newuser.phone }] })
        if (alreadyuser.length >= 1) {
            return res.status(409).send('There is already a user with this email or phone')
        }

        let passwortGehashed = await bcrypt.hash(newuser.password, 10)
        let createuser = await userModel.create({ ...newuser, password: passwortGehashed })


        res.status(201).send(createuser);

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
        console.log("signuperror=",error)
    }
}