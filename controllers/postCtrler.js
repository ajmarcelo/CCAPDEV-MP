const db = require('../model/db.js');

const Post = require('../model/postCQ.js');

const postCtrler = {
    getPostForm: function (req, res) {
        res.render('postForm');
    },

    postPostForm: function (req, res) {
        var username = req.session.uname;
        var postID = db.getObjectID();
        var date = new Date().toISOString().slice(0, 10);
        var plant = req.body.plant;
        var typeCQ = req.body.typeCQ;
        var content = req.body.content;
        var file = req.body.file;
        
        var post = {
            username: username,
            postID: postID,
            date: date,
            plant: plant,
            typeCQ: typeCQ,
            content: content,
            file: file
        }

        db.insertOne(Post, post, function(flag) {
            if(flag)
                res.render ('plant', post);

            else
                res.render ('error');
        });	
    }

    getPost: function (req, res) {
        var query = {postID.req.params.postID};
        var projection = 'username postID date plant typeCQ content file';
        var details = {};

        db.findOne (Post, query, projection, function (post) {
            details.username = post.username;
            details.postID = post.postID;
            details.date = post.date;
            details.plant = post.plant;
            details.typeCQ = post.typeCQ;
            details.content = post.content;
            details.file = post.file;

            db.findMany (Comment, {postParent: req.params.postID}, '', function (result) {
                details.comments = result;
            });
            res.render ('viewpost', details);
        });
    }

    editPost: function (req, res) {
        var query = {postID: req.params.postID};
        var projection = 'username date typeCQ content file';
        var details = {}

        db.findOne (Post, query, projection, function (post) {
            if (post != null) {
                details.username = post.username;
                details.date = post.date;
                details.typeCQ = post.typeCQ;
                details.content = post.content;
                details.file = post.file;
                if (post.username == req.session.username)
                    details.owner = true;

                var urlParam = req.params.pName;
                db.findOne (Plant, {pName: urlParam}, 'pName', function (plant)
                {
                    // urlRender = '/plant' + plant.pName;
                    // res.render (urlRender, details);
                    res.render ('editPostForm', details);
                });
            }
            else
                res.render ('error');
        });
    },

    postEditPostForm: function (req, res) {
        var username = req.session.uname;
        var postID = db.getObjectID();
        var date = new Date().toISOString().slice(0, 10);
        var plant = req.body.plant;
        var typeCQ = req.body.typeCQ;
        var content = req.body.content;
        var file = req.body.file;
        
        var post = {
            username: username,
            postID: postID,
            date: date,
            plant: plant,
            typeCQ: typeCQ,
            content: content,
            file: file
        }

        db.updateOne(Post, {postID: postID}, function(flag) {
            if(flag)
                res.render ('plant', post);

            else
                res.render ('error');
        });   
    }

    deletePost: function (req, res) {
        // var query = {pName: req.params.pName};

        db.findOne (Plant, query, '', function (plant) {
            var plantType = plant.pName;    // To go bakk to plant section
            db.deleteOne (Post, {username: req.session.username}, function (post) {
                db.deleteMany (Comment, {postParent: post.postID}, function (comment) {
                    res.redirect('plant');
                });
            });
        });
    }
}

module.exports = postCtrler;