const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        let err = new Error(`User with ${req.body.email} already exists.`);
        res.status(400);
        return next(err);
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        let user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phoneNumber = req.body.phoneNumber;
        user.email = req.body.email;
        user.password = hash;
        if (req.body.role) user.role = req.body.role;
        user.orders = [];
        user
          .save()
          .then((user) => {
            res.status(201).json({
              status: "User registered sucessfully",
              userId: user._id,
              email: user.email,
              role: user.role,
            });
          })
          .catch(next);
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user == null) {
      let err = new Error(`User with ${req.body.email} has not registered`);
      console.log(err);
      res.status(404);
      return next(err);
    }
    bcrypt.compare(req.body.password, user.password, (err, status) => {
      if (err) return next(err);
      if (!status) {
        let err = new Error("Password does not match");
        console.log(err);
        res.status(401);
        return next(err);
      }
      let data = {
        userId: user._id,
        email: user.email,
      };
      jwt.sign(data, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) return next(err);
        console.log(token);
        res.json({
          status: "Login Success",
          userId: user._id,
          token: token,
        });
      });
    });
  });
};

const adminlogin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user == null) {
      let err = new Error(`Admin user with ${req.body.email} has not registered`);
      console.log(err);
      res.status(404);
      return next(err);
    }
    if(user.role != "Admin") {
      let err = new Error(`You are not an Admin`);
      console.log(err);
      res.status(404);
      return next(err);
    }
    bcrypt.compare(req.body.password, user.password, (err, status) => {
      if (err) return next(err);
      if (!status) {
        let err = new Error("Password does not match");
        console.log(err);
        res.status(401);
        return next(err);
      }
      let data = {
        userId: user._id,
        email: user.email,
        role: "Admin"
      };
      jwt.sign(data, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) return next(err);
        console.log(token);
        res.json({
          status: "Login Success",
          userId: user._id,
          token: token,
        });
      });
    });
  });
};

module.exports = {
  signUp,
  login,
  adminlogin
};
