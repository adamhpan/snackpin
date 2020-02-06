const LocalStrategy = require('passport-local').Strategy
const passport      = require('passport');
const bcrypt        = require('bcrypt-nodejs');

const User = require('../models/user');


passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser(async (id, next) => {
  let user = await User.findByPk(id);

  if(user) {
    next(null, user)
  } else {
    next("No user found.")
  }
})

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, next) => {
    let user = await User.findOne({ where: {
      email: email
    }})

    if (!user) return next(null, false, { message: 'No such user' })

    if(bcrypt.compareSync(password, user.password)) {
      next(null, user);
    } else {
      next("Incorrect password.")
    }
  }
))

module.exports = passport;
