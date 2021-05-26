const bcrypt = require('bcrypt');

const db = require('../model/db.js');

const User = require('../model/user.js');

const logInCtrler = {
    getLogIn: function (req, res) {
        res.render('login');
    },

    postLogIn: function (req, res) {
        var errors = validationResult(req);
        var uname = req.body.uname;
        var pword = req.body.pword;

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('login', details);
        }

        else {
            db.findOne(User, {username: uname}, '', function (result) {
                if(result) {
                    var user = {
                        fName: result.fName,
                        lName: result.lName,
                        uname: result.username
                    };

                    bcrypt.compare(pword, result.password, function(err, equal) {
                        if(equal) {
                            req.session.username = user.uname;
                            res.render('home');
                        }

                        else {
                            var details = {
                                flag: false,
                                error: `INCORRECT username and/or password.`
                            };

                            res.render('login', details);
                        }
                    });
                }

                else {
                    var details = {
                        flag: false,
                        error: `INCORRECT username and/or password.`
                    };

                    res.render('login', details);
                }
            });
        }
    
    }
}

module.exports = logInCtrler;