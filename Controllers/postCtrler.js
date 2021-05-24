const db = require('../Model/db.js');

const Post = require('../Model/postCQ.js');

const postCtrler = {
    getPostForm: function (req, res) {
        res.render('postForm');
    },

    postPostForm: function (req, res) {
         //start temporary
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
        // end temporary    
            res.render('postForm', details);
        }

        else {
            var date = req.body.today;
            var plant = req.body.plant;
            var postType = req.body.ptype;
            var content = req.body.msg;
            var file = req.body.imgf;
            
            function(req, res) {
                var post = {
                    date: date,
                    plant: plant,
                    postType: postType,
                    content: content,
                    file: file                   
                }

                db.insertOne(Post, post, function(flag) {
                    if(flag) {
                        res.render('postForm');
                    }
                });
            }
        }   	
    },

    // editPost: function (req, res) {

    // },

    // deletePost: function (req, res) {

    // }
}

module.exports = postCtrler;