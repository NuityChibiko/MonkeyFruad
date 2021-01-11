const express = require("express"),
  bodyParser = require("body-parser"),
  // passport = require("passport"),
  flash = require("connect-flash"),
   cors = require('cors')
  // passportLocal = require('passport-local'),
  indexRoutes = require("./routes/index"),
  userRoutes = require("./routes/User"),
  postRoutes = require("./routes/Post"),
  adminRoutes = require("./routes/Admin"),
// set up express
 app = express();
 app.use(express.json())
 app.use(cors())

// app
// Set Route
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log("server start on port 7000");
});