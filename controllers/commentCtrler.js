const db = require('../model/db.js');

const Comment = require('../model/postCmnts.js');

const commentCtrler = {
    addComment: function (req, res) {
        var username = req.session.uname;
        var cmntID = db.getObjectID();
        var date = new Date ().toISOString().slice(0, 10);
        var content = req.body.content;
        var postParent = req.params.postParent;

        var comment = {
            username: username,
            cmntID: cmntID,
            date: date,
            content: content,
            postParent: postParent
        }

        db.insertOne (Comment, post, function (flag) {
            if (flag)
                res.render ('viewPost', comment);

            else
                res.render ('error');
        });
    },

    editComment: function (req, res) {
        var query = {cmntID: req.params.cmntID};
        var projection = 'username date content';
        var details = {};

        db.findOne (Comment, query, projection, function (comment) {
            if (comment != null) {
                details.username = comment.username;
                details.date = comment.date;
                details.content = comment.content;

                res.render ('viewPost', details);
            }

            else
                res.render ('error');
        });
    },

    deleteComment: function (req, res) {
        db.deleteOne (Comment, {cmntID: req.params.cmntID}, function (comment) {
            res.redirect ('viewPost');
        })
    }
}

module.exports = commentCtrler;