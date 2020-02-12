const bcrypt = require("bcryptjs");
const express = require("express");
const { Op } = require("sequelize");
const passport = require("passport")

const User = require("../models/user");
const SnackUser = require("../models/snack-user");

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

router.post("/users/login", async (req, res, next) => {
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

router.get('/users/logout', function(req, res){
  req.logout();
  res.status(200).json("User logged out.")
});

router.get("/users/:userId/snacks", async (req, res) => {
  let userSnacks = await SnackUser.findAll({
    where: {
      userId: req.params.userId
    }
  })

  res.status(200).json(userSnacks)
})

router.delete("/users/:userId/snacks/:snackId", async (req, res) => {
  let userId = parseInt(req.params.userId);
  let snackId = parseInt(req.params.snackId);

  let snackUser = await SnackUser.findOne({
    where: {
      [Op.and]: [{
        userId
      }, {
        snackId
      }]
    }
  });

  if(snackUser) {
    snackUser.destroy();
  }

  res.sendStatus(200);
});

router.post("/users/:userId/snacks/:snackId", async (req, res) => {
  let snackUser = await SnackUser.create({
    userId: req.params.userId,
    snackId: req.params.snackId
  });

  res.status(200).json(snackUser)
})

module.exports = router;
