module.exports = function (app) {
    /*
     * Routes
     */
    app.use("/api/messages", require("./routes/messages.route"));
    app.use("/api/conversations", require("./routes/conversations.route"));
    app.use("/api/auth", require("./routes/auth.route"));
    app.use("/api/users", require("./routes/users.route"));
    app.use("/api/", require("./routes/root.route"));
};
