module.exports = {
  logged: function(req,res,next){
    if(req.isAuthenticated()){
      return next()
    } else {
      req.flash("error_msg","You need have the login")
      res.redirect("/visitor/log_form")
    }

  }
}
