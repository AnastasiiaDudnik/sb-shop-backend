const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  // origin: ["http://localhost:3000", "anastasiiadudnik.github.io"],
  origin: true,
  // origin: "anastasiiadudnik.github.io",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
// app.options("*", cors(corsOptions));

const { SESSION_SECRET_KEY } = process.env;
const { getRecentlyViewedProducts } = require("./helpers");

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    debug: true,

    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // Set the session max age to 1 hour (in milliseconds)
    },
  })
);

app.use((req, res, next) => {
  const { id } = req.session;

  // Fetch recently viewed products from the server/database based on the sessionToken
  const recentlyViewedProducts = getRecentlyViewedProducts(id);

  // Attach recently viewed products to the request object for use in route handlers
  // req.sessionToken = sessionToken;
  req.recentlyViewedProducts = recentlyViewedProducts;

  next();
});

app.use("/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
