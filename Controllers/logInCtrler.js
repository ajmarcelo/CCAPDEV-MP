const bcrypt = require('bcrypt');

const db = require('../Model/db.js');

const User = require('../Model/user.js');

const logInCtrler = {
    getLogIn: function (req, res) {
        if(req.session.uname) {
            res.redirect('/profile/' + req.session.uname);
        }

        else {
            var details = {
                flag: false
            };

            res.render('login', details);
        }
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
                        res.redirect('/profile/' + user.uname);
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