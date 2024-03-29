const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../model/db.js');

const User = require('../model/user.js');

const signupCtrler = {
    getSignUp: function (req, res) {
        res.render('signup');
    },

    postSignUp: function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            
            res.render('signup', details);
        }

        else {
            var fName = req.body.fname;
            var lName = req.body.lname;
            var username = req.body.uname;
            var password = req.body.pword;
            var birthday = req.body.bday;
            var country = req.body.cname;
            var email = req.body.email;
            var businessName = req.body.pbname;
            var businessYrs = req.body.byears;
            var proofLink = req.body.olink;            
            var role = "member";
            var bio = req.body.bio;

            if(proofLink != "")
                role = "contributor";                

            bcrypt.hash(password, saltRounds, function(err, hash) {

                var user = {
                    fName: fName,
                    lName: lName,
                    username: username,
                    password: hash,
                    birthday: birthday,
                    country: country,
                    email: email,
                    businessName: businessName,
                    businessYrs: businessYrs,
                    proofLink: proofLink,
                    role: role,
                    bio: bio                    
                }
   
                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        res.redirect('/login');
                    }
                });
            });
        }
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    }
}

module.exports = signupCtrler;