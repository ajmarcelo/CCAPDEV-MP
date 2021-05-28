const db = require('../model/db.js');
const User = require('../model/user.js');
const Post = require('../model/postCQ.js');
const homeCtrler = {
    getHome: function (req, res) {
        var username = req.session.username;
        
        db.findOne(User, {username: username}, '', function (result) {
            
            if(result){
                var details = {role: result.role};
                res.render('home', details);
            }
            else
              res.render('home');  
        });
    },

    postHome: function(req, res) {
        var query = {plant: req.body.search};
        var details = {};
        details.word = req.body.search;
        db.findMany(Post, query, '', function(result) {
            if(result) {
                details.posts = result;
                details.role = req.session.role;
                res.render('searchResults', details);
            }
            else {
                res.render('error');
            }
        });
    }
}

module.exports = homeCtrler;