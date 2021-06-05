const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var fs = require("fs");
app.use(cookieParser());
bodyParser = bodyParser.urlencoded({ extended: false });

var users = [];
fs.readFile("users.json", function (err, data) {
  if (err) return console.log(err);
  if (data) {
    users = JSON.parse(data);
    // users.push(JSON.parse(data));
  }
});

// Landing Page
exports.landingComponent = (req, res) => {
  res.layout("landing", {
    layout: "index",
    loggedIn: false,
  });
};

// Authentication
exports.loginComponent = (req, res) => {
  res.layout("login", {
    layout: "index",
    error: "",
  });
};

exports.registerComponent = (req, res) => {
  res.layout("register", {
    layout: "index",
    error: "",
    loggedIn: false,
  });
};

exports.registerForm = (req, res, loggedIn) => {
  if (req.body.fullname && req.body.email && req.body.password) {
    res.cookie("didlogin", "true");
    var user = {
      fullName: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    };
    users.forEach(data => {
      if (data.email == user.email) {
        res.layout("register", {
          layout: "index",
          error: "Email is already Taken",
        });
      }
    });
    res.cookie("userData", user);
    users.push(user);
    fs.writeFile("users.json", JSON.stringify(users), function (err) {
      if (err) return console.log(err);
    });
    res.redirect("/home");
  } else {
    res.layout("register", {
      layout: "index",
      error: "enter a valid data",
      loggedIn: false,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("didlogin", "");
  res.clearCookie("userData");
  res.redirect("/");
};

exports.loginForm = (req, res) => {
  if (req.body.email && req.body.password) {
    // res.cookie("didlogin", "true");
    var user = {
      // fullName: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    };
    users.forEach(data => {
      if (data.email == user.email && data.password == user.password) {
        res.cookie("didlogin", "true");
        res.cookie("userData", user);
        res.redirect("/home");
      }
    });
    res.layout("login", {
      layout: "index",
      error: "incorrect email or password",
      loggedIn: false,
    });
  } else {
    res.layout("login", {
      layout: "index",
      error: "enter a valid data",
      loggedIn: false,
    });
  }
};

exports.homeComponent = (req, res) => {
  var books = [];
  fs.readFile("book-data.db", function (err, data) {
    if (err) return console.log(err);
    if (data) {
      books = JSON.parse(data);

      res.layout("home", {
        layout: "authIndex",
        books: books,
      });
      // users.push(JSON.parse(data));
    }
  });
};

exports.profileComponent = (req, res) => {
  users.forEach(data => {
    if (data.email == req.cookies.userData.email) {
      res.layout("profile", {
        layout: "authIndex",
        user: data,
      });
    }
  });
};
