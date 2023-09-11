const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = require("./app");

const { DB_HOST, PORT = 3001, SESSION_SECRET_KEY } = process.env;

const store = new MongoStore({
  mongoUrl: DB_HOST,
  collection: "sessions",
});

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 1707195600 }, // Session expiration time
  })
);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
