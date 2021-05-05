const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const controller = require("./controller");
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(require("ejs-yield"));
bodyParser = bodyParser.urlencoded({ extended: false });
app.get("/", (req, res) => {
  // res.send("welcome");
  res.layout("login", {
    layout: "index",
  });
});

app.listen(5000);
