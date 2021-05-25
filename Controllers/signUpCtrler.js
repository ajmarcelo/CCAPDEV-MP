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
        //start temporary
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
        // end temporary    
            res.render('signup', details);
        }

        else {
            var fName = req.body.fName;
            var lName = req.body.lName;
            var username = req.body.uname;
            var password = req.body.pword;
            var birthday = req.body.bday;
            var country = req.body.cname;
            var email = req.body.email;
            var businessName = req.body.pbname;
            var businessYrs = req.body.byears;
            var proofLink = req.body.olink;
            bcrypt.hash(pw, saltRounds, function(err, hash) {

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
                    proofLink: proofLink                    
                }

                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        res.redirect('/success?fName=' + fName +'&lName=' + lName + '&username=' + username);
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