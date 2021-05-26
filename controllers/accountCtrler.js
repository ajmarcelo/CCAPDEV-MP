const db = require('../model/db.js');

const User = require('../model/user.js');

const accountCtrler = {
    getMyAccount: function (req, res) {
        var query = {username: req.session.username};

        var projection = 'fName lName username bio password birthday country email businessName businessYrs';

        var details = {};

        db.findOne(User, query, projection, function(result) {
            if(result != null) {
                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;
                details.bio = result.bio;
                details.password = result.password;
                details.birthday = result.birthday;
                details.country = result.country;
                details.email = result.email;
                details.businessName = result.businessName;
                details.businessYrs = result.businessYrs;    

                res.render('myAccount', details);
            }

            else {
                res.render('error');
            }
        });
    },

    getOtherAccount: function (req, res) {
        var query = {username: req.params.username};

        var projection = 'fName lName username bio birthday country email businessName businessYrs';

        var details = {};

        db.findOne(User, query, projection, function(result) {
            if(result != null) {
                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;
                details.bio = result.bio;
                details.birthday = result.birthday;
                details.country = result.country;
                details.email = result.email;
                details.businessName = result.businessName;
                details.businessYrs = result.businessYrs;  

                res.render('otherAccount', details);
            }

            else
                res.render('error');
            
        });
    },

    getEditAccount: function(req, res) {
        var query = {username: req.session.username};

        var projection = 'fName lName username bio password birthday country email businessName businessYrs';

        var details = {};

        db.findOne(User, query, projection, function(result) {
            if(result != null) {
                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;
                details.bio = result.bio;
                details.password = result.password;
                details.birthday = result.birthday;
                details.country = result.country;
                details.email = result.email;
                details.businessName = result.businessName;
                details.businessYrs = result.businessYrs;      

                res.render('accountEdit', details);
            }

            else {
                res.render('error');
            }
        });  
    },

    postEditAccount: function(req, res) {
        var query = { username: req.session.username };

        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('accountEdit', details);
        }

        else {
            var update = {
                    fName: req.body.fName,
                    lName: req.body.lName,
                    password: req.body.password,
                    birthday: req.body.birthday,
                    country: req.body.country,
                    email: req.body.email,
                    businessName: req.body.business,
                    businessYrs: req.body.years
                };

                var details = {};

                db.updateOne(User, query, update, function(result) {
                    if(result != null) {
                        details.fName = result.fName;
                        details.lName = result.lName;
                        details.username = result.username;
                        details.bio = result.bio;
                        details.password = result.password;
                        details.birthday = result.birthday;
                        details.country = result.country;
                        details.email = result.email;
                        details.businessName = result.businessName;
                        details.businessYrs = result.businessYrs;      

                        res.render('myAccount', details);
                    }

                    else {
                        res.render('error');
                    }
                });  
        }        
    },

    getDeleteAccount: function(req, res) {
        var query = {username: req.session.username};

        db.findOne(User, query, '', function (user) {
            res.render('confirmDelete', user);
        }); 
    },

    postDeleteAccount: function(req, res) {
        var errors = validationResult(req);
        var query = {username: req.body.uname};

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('myAccount', details);
        }

        else {
            db.findOne(User, query, '', function(user) {
                db.deleteMany(Comment, {username: user.username}, function(result) {
                    db.deleteMany(Post, {username: user.username}, function(result){
                        db.deleteOne(User, {username: user.username}, function(flag){
                            if(flag)
                            {
                                req.session.destroy(function(error){
                                    if (error)
                                        throw error;
                                    res.redirect('/');
                                });
                            }
                            else
                            {
                                res.redirect('/myAccount');
                            }
                        });
                    });
                });   
            });
        }
    }
}

module.exports = accountCtrler;