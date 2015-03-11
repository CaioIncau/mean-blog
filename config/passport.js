var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('Usuario');
    passport.use("local-login", new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, function(req, email, password, done) {
    	 User.findOne({ 'email' :  email }, function(err, user) {
            console.log(user); 
            console.log(!user.validPassword(password));
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                console.log("usuario nao encontrado");
                return done(null, false); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                console.log("senha invalida");
                return done(null, false, req); // create the loginMessage and save it to session as flashdata

            console.log("logou");
            // all is well, return successful user
            return done(null, user);
        });

    }));

    passport.serializeUser(function(usuario, done) {
      done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
      Usuario.findById(id).exec()
      .then(function(usuario) {
          done(null, usuario);
      });
	});
};