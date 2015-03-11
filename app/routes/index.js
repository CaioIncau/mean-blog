var passport = require('passport');
var auth = require('../middleware/auth');
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
        console.log(req.user);
    });
    app.get('/blog',auth, function(req, res) {
        res.redirect('/#/blog');
        console.log(req.user);
    });
    // route to test if the user is logged in or not 
    app.get('/loggedin', function(req, res) 
    	{ res.send(req.isAuthenticated() ? req.user : '0'); }); 
    // route to log in 
    app.post('/login', passport.authenticate('local-login',
    				 { successRedirect: '/#blog',
                       failureRedirect: '/#login' })); 
    // route to log out 
    app.post('/logout', 
    	function(req, res){ req.logOut(); res.send(200); });
};
