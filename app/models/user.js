// app/models/user.js
// load the things we need
var Schema = require('mongoose').Schema;
var md5 = require('MD5');
var db = require('mongoose');

// define the schema for our user model

// create the model for users and expose it to our app

    module.exports = function(app){

        var userSchema = Schema({
            email        : String,
            password     : String
    });

    // methods ======================
    // generating a hash
    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    userSchema.methods.validPassword = function(password) {
        return  md5(this.password) == md5(password);
    };


    return db.model('Usuario', userSchema);

};
