const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  flash = require("connect-flash"),
  // passportLocal = require('passport-local'),
  indexRoutes = require("./routes/index"),
  multer = require("multer");
// set up express
const app = express();

app.use(passport.initialize());
app.use(passport.session());

// app
// Set Route
app.use("/", indexRoutes);
const port = process.env.port || 7000;

app.listen(port, () => {
  console.log("server start on port 5000");
});

// app
// Set Route
