const mongoose = require('mongoose');
const user = mongoose.model("user");
const otpGenerator = require('otp-generator')
module.exports = {
    insert(req, res) {
        user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            otp: otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        }).then((result) => {
            return res.status(200).json({
                "status": true,
                "message": "Sigup Sucessfully"
            })
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    login(req, res) {
        user.find({
            mobile: req.body.mobile,
            otpverified: false
        }).then((result) => {
            if (result.length) {
                console.log('otp is -------------->  ' + result[0].otp);
                return res.status(200).json({
                    "status": true,
                    "message": "send otp in your mobile number"
                })
            } else {
                return res.status(200).json({
                    "status": false,
                    "message": "Invalid Mobile Number"
                })
            }
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    otpverified(req, res) {
        user.find({
            mobile: req.body.mobile,
            otp: req.body.otp
        }).then((result) => {
            if (result.length) {
                return res.status(200).json({
                    "status": true,
                    "message": "login success"
                })
            } else {
                return res.status(200).json({
                    "status": false,
                    "message": "Wrong Otp"
                })
            }
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    }
}
