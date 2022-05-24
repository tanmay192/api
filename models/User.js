const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            max: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            max: 255,
            default: "Let's talk",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
