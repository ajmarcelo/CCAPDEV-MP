const db = require('../model/db.js');

const User = require('../model/user.js');

const accountCtrler = {
    getAccount: function (req, res) {
        var query = {username: req.params.username};

        var projection = 'fName lName username';

        var details = {};

        if(req.session.username) {
            details.flag = true;
            details.username = req.session.username;
        }

        else
            details.flag = false;


        db.findOne(User, query, projection, function(result) {
            if(result != null) {
                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;


                res.render('otherAccount', details);
                
                res.render('myAccount', details);
            }

            else
                res.render('error', details);
            
        });
    }
}

module.exports = accountCtrler;