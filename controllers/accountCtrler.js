const { validationResult } = require('express-validator');
const db = require('../model/db.js');
const User = require('../model/user.js');
const Comment = require('../model/postCmnts.js');
const Post = require('../model/postCQ.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const accountCtrler = {
    getMyAccount: function (req, res) {
        var query = {username: req.session.username};

        var details = {};

        db.findOne(User, query, '', function(result) {
            if(result != null) {
                var bday = new Date(result.birthday);
                var happy = ("0"+(bday.getMonth()+1)).slice(-2)+"-"+ ("0"+bday.getDate()).slice(-2)+"-"+bday.getFullYear();

                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;
                details.bio = result.bio;
                details.birthday = happy;
                details.country = result.country;
                details.email = result.email;
                details.businessName = result.businessName;
                details.businessYrs = result.businessYrs;    
                details.role = result.role;
                res.render('myAccount', details);
            }

            else {
                res.render('error');
            }
        });
    },

    getOtherAccount: function (req, res) {
        var query = {username: req.params.username};

        if(req.params.username == req.session.username)
            res.redirect('/myAccount');
        else{
            db.findOne(User, query, '', function(result) {
                var details = {};
                if(result != null) {
                    var bday = new Date(result.birthday);
                    var happy = ("0"+(bday.getMonth()+1)).slice(-2)+"-"+ ("0"+bday.getDate()).slice(-2)+"-"+bday.getFullYear();
                    details.fName = result.fName;
                    details.lName = result.lName;
                    details.username = result.username;
                    details.bio = result.bio;
                    details.birthday = happy;
                    details.country = result.country;
                    details.email = result.email;
                    details.businessName = result.businessName;
                    details.businessYrs = result.businessYrs;  
                    details.role = req.session.role;
                    details.role1 = result.role;
                    res.render('otherAccount', details);
                }

                else
                    res.render('error');
                
            });
        }
    },

    getEditAccount: function(req, res) {
        var query = {username: req.session.username};

        var details = {};

        db.findOne(User, query, '', function(result) {
            if(result != null) {
                var bday = new Date(result.birthday);
                var happy = bday.getFullYear()+"-"+("0"+(bday.getMonth()+1)).slice(-2)+"-"+("0"+bday.getDate()).slice(-2);                
                details.fName = result.fName;
                details.lName = result.lName;
                details.username = result.username;
                details.bio = result.bio;
                details.password = result.password;
                details.birthday = happy;
                details.country = result.country;
                details.email = result.email;
                details.businessName = result.businessName;
                details.businessYrs = result.businessYrs;      
                details.role = result.role;
                res.render('accountEdit', details);
            }

            else {
                res.render('error');
            }
        });  
    },

    postEditAccount: function(req, res) {
        var query = {username: req.session.username};
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            db.findOne(User, query, '', function(result) {
                if(result != null) {
                    var bday = new Date(result.birthday);
                    var happy = bday.getFullYear()+"-"+("0"+(bday.getMonth()+1)).slice(-2)+"-"+("0"+bday.getDate()).slice(-2);                
                    details.fName = result.fName;
                    details.lName = result.lName;
                    details.bio = result.bio;
                    details.password = result.password;
                    details.birthday = happy;
                    details.country = result.country;
                    details.email = result.email;
                    details.businessName = result.businessName;
                    details.businessYrs = result.businessYrs;      
                    details.role = result.role;
                    res.render('accountEdit', details);
                }

                else {
                    res.render('error');
                }
            });  
        }

        else {
            var username = req.session.username;
            var role = req.session.role;            
            var fName = req.body.fName;
            var lName = req.body.lName;
            var password = req.body.password;
            var birthday = req.body.birthday;
            var country = req.body.country;
            var email= req.body.email;
            var businessName = req.body.business;
            var businessYrs = req.body.years;
            var bio = req.body.bio;

            bcrypt.hash(password, saltRounds, function(err, hash) {
                var update = {
                    username: username,
                    role: role, 
                    fName: fName,
                    lName: lName,
                    password: hash,
                    birthday: birthday,
                    country: country,
                    email: email,
                    businessName: businessName,
                    businessYrs: businessYrs,
                    bio: bio

                };

                db.updateOne(User, {username: req.session.username}, update, function(flag) {
                    if(flag) {
                        res.render('myAccount', update);                           
                    }
                });  
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
        var details = {role: req.session.role};
        if (!errors.isEmpty()) {
            errors = errors.errors;
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
                                res.redirect('/myAccount', details);
                            }
                        });
                    });
                });   
            });
        }
    }
}

module.exports = accountCtrler;