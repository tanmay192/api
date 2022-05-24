const router = require("express").Router();
const User = require("../models/User");

// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const email = req.query.email;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ email: email });

        if (!user) return res.status(204).send("User not found");

        const { password, updatedAt, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
