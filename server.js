const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const controller = require("./controller");
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(require("ejs-yield"));
bodyParser = bodyParser.urlencoded({ extended: false });
app.get("/sw.js", (req, res) => {
  res.sendFile(__dirname + "/sw.js");
});
app.get("/style", (req, res) => {
  res.sendFile(__dirname + "/dist/tailwind.css");
});
app.get("/", (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } //else {
  controller.landingComponent(req, res);
  // }
});
app.get("/error", (req, res) => {
  // res.statusCode = 404;
  if (req.cookies.didlogin == "true") {
    res.layout("error404", {
      layout: "authIndex",
    });
  } else {
    res.layout("error404", {
      layout: "index",
    });
  }
});
app.get("/offline", (req, res) => {
  // if (req.cookies.didlogin == "true") {
  //   res.layout("offline", {
  //     layout: "authIndex",
  //   });
  // } else {
  res.layout("offline", {
    layout: "index",
  });
  // }
});
app.get("/login", (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    controller.loginComponent(req, res);
  }
});
app.post("/loginForm", bodyParser, (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    controller.loginForm(req, res);
  }
});

app.get("/register", (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    controller.registerComponent(req, res);
  }
});
app.post("/registerForm", bodyParser, (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    controller.registerForm(req, res);
  }
});

app.get("/home", (req, res) => {
  if (req.cookies.didlogin == "true") {
    controller.homeComponent(req, res);
  }
  // } else {
  //   res.redirect("/");
  // }
});

app.get("/profile", (req, res) => {
  if (req.cookies.didlogin == "true") {
    controller.profileComponent(req, res);
  } else {
    res.redirect("/");
  }
});
app.get("/logout", (req, res) => {
  controller.logout(req, res);
});

app.listen(5000);
