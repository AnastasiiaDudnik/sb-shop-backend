const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3001, SESSION_SECRET_KEY } = process.env;

app.use(
  session({
    secret: SESSION_SECRET_KEY, // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
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
