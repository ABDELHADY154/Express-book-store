const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const controller = require("./controller");
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(require("ejs-yield"));
bodyParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    controller.landingComponent(req, res);
  }
});

app
  .route("/login")
  .get((req, res) => {
    if (req.cookies.didlogin == "true") {
      res.redirect("/home");
    } else {
      controller.loginComponent(req, res);
    }
  })
  .post(bodyParser, (req, res) => {
    if (req.cookies.didlogin == "true") {
      res.redirect("/home");
    } else {
      controller.loginForm(req, res);
    }
  });

app
  .route("/register")
  .get((req, res) => {
    if (req.cookies.didlogin == "true") {
      res.redirect("/home");
    } else {
      controller.registerComponent(req, res);
    }
  })
  .post(bodyParser, (req, res) => {
    if (req.cookies.didlogin == "true") {
      res.redirect("/home");
    } else {
      controller.registerForm(req, res);
    }
  });

app.get("/home", (req, res) => {
  if (req.cookies.didlogin == "true") {
    controller.homeComponent(req, res);
  } else {
    res.redirect("/");
  }
});
app.get("/logout", (req, res) => {
  controller.logout(req, res);
});

// fallback route
app.get("*", function (req, res) {
  res.send("page not found");
});
app.listen(5000);
