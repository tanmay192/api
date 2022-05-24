const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

// Connect to MongoDB
const db = require("./db");
const PORT = process.env.PORT || 3020;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.set("port", PORT);
app.set("env", NODE_ENV);

// Import routes
require("./routes")(app);

app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            "port"
        )} | Environment : ${app.get("env")}`
    );
});
