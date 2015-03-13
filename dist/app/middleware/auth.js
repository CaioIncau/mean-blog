module.exports = function auth(req, res, next) {

    // if user is authenticated in the session, carry on 
    console.log("logado?" + req.isAuthenticated());
    
    if (req.isAuthenticated()){
        return next();
    }else{
		res.status(401).end();
    }

    // if they aren't redirect them to the home page
};