const bcrypt = require('bcrypt');

const db = require('../model/db.js');

const User = require('../model/user.js');

const logInCtrler = {
    getLogIn: function (req, res) {
        res.render('login');
    },

    postLogIn: function (req, res) {
        var uname = req.body.uname;
        var pword = req.body.pword;

        db.findOne(User, {uname: uname}, '', function (result) {
            if(result) {
                var user = {
                    fName: result.fName,
                    lName: result.lName,
                    uname: result.uname
                };

                bcrypt.compare(pword, result.pword, function(err, equal) {
                    if(equal) {
                        req.session.uname = user.uname;
                        req.session.fname = user.fName;
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

module.exports = logInCtrler;