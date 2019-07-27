const localStrategy = require("passport-local").Strategy
const Sequelize = require('sequelize')
const  bcrypt = require("bcryptjs")
const User = require('../models/User')

module.exports = function(passport){
  passport.use(new localStrategy({usernameField:'username',passwordField:'password'},(username,password,done) => {
    User.findOne({where:{username:username}}).then((user) => {
      if(!user){
        return(null,false,{message:"Not found"})
      }

      bcrypt.compare(password,user.password,(err,match) => {
        if(match){
          return done(null,user)
        } else {
          return done(null,false,{message:"Password incorrect"})
        }
      })
    })
  }))

  passport.serializeUser((user,done) => {
    done(null,user)
  })

  passport.deserializeUser((user,done) => {
      done(null,user)
  })

}
