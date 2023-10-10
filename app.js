const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { nanoid } = require("nanoid");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { SESSION_SECRET_KEY } = process.env;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // name: "my-session-cookie", // Change the cookie name
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
