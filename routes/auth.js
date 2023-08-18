var express = require('express');
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/User');

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    // Use regex to validate the password format
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!passwordRegex.test(password)) {
    //   res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    //   return;
    // }


    User.findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({ email, password: hashedPassword, fullName, username })
                .then((createdUser) => {

                    const { email, _id, fullName, username } = createdUser;

                    const payload = { email, _id, fullName, username };

                    const authToken = jwt.sign(payload, process.env.SECRET, {
                        algorithm: "HS256",
                        expiresIn: "6h",
                    });

                    res.status(200).json({ authToken });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: "Internal Server Error" });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
