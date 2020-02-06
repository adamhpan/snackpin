const bcrypt = require("bcryptjs");
const express = require("express");
const { Op } = require("sequelize");
const passport = require("passport")

const User = require("../models/user");

const router = express.Router();

router.post("/user", async (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);

  let user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if(user) {
    res.status(500).json({
      error: "User already exists."
    })
  } else {
    user = await User.create({
      email: req.body.email,
      password: hash
    });

    res.status(200).json(user);
  }
});

router.post("/user/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return res.status(401).json({
        error: {
          message: "Wrong email/password."
        }
      })
    }

    if(!user) {
      return res.status(401).json({
        error: {
          message: "No user found."
        }
      })
    }

    req.logIn(user, (err) => {
      if(err) { next(err); }
      return res.status(200).json(user)
    })
  })(req, res, next);
})

router.get('/user/logout', function(req, res){
  req.logout();
  res.status(200).json("User logged out.")
});

module.exports = router;
