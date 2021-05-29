const { validationResult } = require('express-validator');
const db = require('../model/db.js');
const Post = require('../model/postCQ.js');
const Plant = require('../model/plant.js');
const Comment = require('../model/postCmnts.js');
const path = require('path');
const postCtrler = {
    getPostForm: function (req, res) {
        var query = {};
        var details = {};
        db.findMany(Plant,query,'pName', function(result){
            details.plants = result;
            res.render('postForm', details);
        });
    },

    postPostForm: function (req, res) {
        var username = req.session.username;
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            details.plant = req.body.plant;
            details.ptype = req.body.ptype;
            details.msg = req.body.msg;
            res.render('postForm', details);

        }        
       
        else {
            var postID = db.getObjectID();
            var date = new Date().toISOString().slice(0, 10);
            var plant = req.body.plant;
            var typeCQ = req.body.ptype;
            var content = req.body.msg;              

            var post = {
                username: username,
                postID: postID,
                date: date,
                plant: plant,
                typeCQ: typeCQ,
                content: content,
                file: "",
                upCtr: 0,
                downCtr: 0, 
                owner: username
            }
        
            db.insertOne(Post, post, function(flag) {
                if(flag){
                    res.redirect('/plant/' + plant);
                }
                else
                    res.render('error');
            });	
        }    
    },   

    postPostForm_FileUpload: function (req, res) {
        db.findOne(Post, {postID: req.params.postID}, '', function (result) {
            if(result){
                db.updateOne(Post, result, {file: req.file.originalname}, function (data) { 
                    if(data)
                        res.redirect('/plant/' + result.plant);
                });
            }
        });
    }, 

    getPost: function (req, res) {
        var query = {postID: req.params.postID};
        db.findOne(Post, query, '', function (result) {
            if(result){
                var date = new Date(result.date);
                var happy = ("0"+(date.getMonth()+1)).slice(-2)+"-"+ ("0"+date.getDate()).slice(-2)+"-"+date.getFullYear();
                var details = {

                    postID:result.postID,
                    username: result.username,
                    date: happy,
                    plant: result.plant,
                    typeCQ: result.typeCQ,
                    content: result.content,
                    file: result.file,
                    role: req.session.role,
                    upCtr: result.upCtr,
                    downCtr: result.downCtr                
                };
                
                if(req.session.username == result.username)
                    details.owner = result.username;
                else
                    details.owner = "";
                
                db.findMany (Comment, {postParent: req.params.postID}, '', function (result) {
                    details.comments = result;
                    res.render ('viewPost', details);
                });                
            }

            else 
                res.render('error');
        });
    },


    getEditPost: function (req, res) {
        var query = {postID: req.params.postID};
        var details = {};

        db.findOne(Post, query, '', function(result) {

            if(result) {               
                details.plant = result.plant;
                details.ptype = result.typeCQ;
                details.msg = result.content;
                db.findMany(Plant,{},'pName', function(result){
                    if(result){
                        details.plants = result;
                        res.render('postForm', details);                        
                    }
                });             
            }
            else {
                res.render('error');
            }
        });          
    },

    postEditPost: function (req, res) {
        var query = {postID: req.params.postID};
        var details = {};
        var date = new Date().toISOString().slice(0, 10);
        var plant = req.body.plant;
        var typeCQ = req.body.ptype;
        var content = req.body.msg;

        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            
            res.render('postForm', details);               
        }
        
        else {
            var plant = req.body.plant;
            var ptype = req.body.ptype;
            var content = req.body.msg;
            var date = new Date().toISOString().slice(0, 10);
                
            var update = {
                plant: plant,
                typeCQ: ptype,
                content: content,
                date: date
            }        

            db.updateOne(Post, query, update, function(flag) {
                if(flag) {
                    res.redirect('/viewPost/' + req.params.postID);                           
                }
            });                     
        }
    },

    
    postDeletePost: function (req, res) {
        var query = {postID: req.params.postID};
        var details = {};
        db.findOne (Post, query, '', function (result) {
            details.plant = result.plant;
            db.deleteMany (Comment, {postParent: req.params.postID}, function (result) {
                db.deleteOne (Post, {postID: req.params.postID}, function (result) {
                    res.redirect('/plant/' + details.plant);
                });
            });

        });
    },

    postUpdateUpVote: function (req, res) {
        var query = {postID: req.params.postID};
        var update = {};
        var details = {};
        db.findOne(Post, query, '', function(result){
            update.upCtr = result.upCtr + 1;
            db.updateOne(Post, query, update, function(flag) {
                if(flag) {
                    res.redirect('/viewPost/' + req.params.postID);                           
                }
            });  
        });
    },

    postUpdateDownVote: function(req, res) {
        var query = {postID: req.params.postID};
        var update = {};
        var details = {};
        db.findOne(Post, query, '', function(result){
            update.downCtr = result.downCtr + 1;
            db.updateOne(Post, query, update, function(flag) {
                if(flag) {
                    res.redirect('/viewPost/' + req.params.postID);                           
                }
            });  
        });
    } 
}

module.exports = postCtrler;