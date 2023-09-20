const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const { nanoid } = require("nanoid");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   const { guest } = req.cookies || nanoid();
//   res.cookie("guest", guest, {
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "lax",
//   }); // 30 days in milliseconds
//   next();
// });

app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
