const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { registerValidation, loginValidation } = require("../validation");

// Register new user
router.post("/register", async (req, res) => {
    // Input Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user is already created
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send("User already exists");

    // Create new user
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASSPHRASE
        ),
    });

    try {
        const savedUser = await newUser.save();
        const { password, ...userDetails } = savedUser._doc;
        return res.status(201).json(userDetails);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        // Input Validation
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Check user exists
        const loggedUser = await User.findOne({ email: req.body.email });
        if (!loggedUser) return res.status(404).send("User doesn't exist");

        // Check for valid password
        const hashedPassword = CryptoJS.AES.decrypt(
            loggedUser.password,
            process.env.SECRET_PASSPHRASE
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (req.body.password !== originalPassword)
            return res.status(401).send("Wrong Password");

        // Login user
        const { password, ...userDetails } = loggedUser._doc;
        return res.status(200).send(userDetails);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
