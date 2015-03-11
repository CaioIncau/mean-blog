var passport = require('passport');
var auth = require('../middleware/auth');

module.exports = function(app) {
    var controller = app.controllers.post;
    console.log(app.controllers.post);


    app.get('/', function(req, res) {
        res.render('index');
        console.log(req.user);
    });
    app.get('/blog',auth, function(req, res) {
        res.redirect('/#/blog');
        console.log(req.user);
    });

    app.route('/contatos')
        .get(controller.listaPosts)
        .post(auth, controller.salvaPost);

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
