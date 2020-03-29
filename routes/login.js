var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const path = require("path");
var Login = require('../public/schema/loginSchema.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('<API_KEY>');

/* GET users listing. */
router.post('/signUp', function (req, res, next) {
    try {
        Login.init();
        const loginModel = new Login({
            "_id": mongoose.Types.ObjectId(),
            "email": req.body.email,
            "password": req.body.password,
        });
        loginModel.save().then((data) => {
            res.status(200).json({ message: "SignUp Successful" })
        }).catch(err => {
            res.status(400).json({ message: "SignUp Failed" });
        });
    } catch (err) {
        res.status(400).json({ message: "Error" })
    }
});

router.get('/', function (req, res) {
    mongoose.model('login').findOne({ email: req.query.email }, (err, docs) => {
        if (err) {
            res.sendStatus(400).json({ message: "Error" });
        }
        else {
            if (docs != null && docs.password == req.query.password) {
                res.status(200).json({ message: "Login successfull" });
            } else {
                res.status(200).json({ message: "Login not successfull" });
            }
        }
    });
});

router.get('/forgotPassword', function (req, res) {
    var otp = Math.floor(1000 + Math.random() * 9000);
    mongoose.model('login').findOne({ email: req.query.email }, (err, docs) => {
        if (err) {
            res.sendStatus(400).json({ message: "Error Please check the mail" })
        }
        else {
            const msg = {
                to: req.query.email,
                from: '55bumc4yax7538a7@gmail.com',
                subject: 'FORGOT PASSWORD FOR APP',
                text: 'The otp for the new password is' + otp
            };
            // sgMail.send(msg);
            docs.otp = otp;
            docs.otp_generated_time = Date.now();
            docs.save();
            res.sendStatus(200);
        }
    })
});

router.get('/resetPassword', function (req, res) {
    mongoose.model('login').findOne({ email: req.query.email }, (err, docs) => {
        if (err) {
            res.status(400).json({ message: "Error" });
        }
        else {
            if (docs != null && docs.otp == req.query.otp) {
                docs.password = req.query.password;
                docs.otp = -1;
                docs.save();
                res.status(200).json({ message: "Reset password succesfull" });
            }
        }
    });
});




module.exports = router;
