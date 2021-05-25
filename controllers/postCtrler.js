const db = require('../model/db.js');

const Post = require('../model/postCQ.js');

const postCtrler = {
    getPostForm: function (req, res) {
        res.render('postForm');
    },

    postPostForm: function (req, res) {
        res.render('postForm', details);

        var date = req.body.today;
        var plant = req.body.plant;
        var postType = req.body.ptype;
        var content = req.body.msg;
        var file = req.body.imgf;
        
        var post = {
            date: date,
            plant: plant,
            postType: postType,
            content: content,
            file: file
        }

        db.insertOne(Post, post, function(flag) {
            if(flag)
                res.render ('plant');

            else
                res.render ('error');
        });	
    }

    // editPost: function (req, res) {

    // },

    // deletePost: function (req, res) {

    // }
}

module.exports = postCtrler;