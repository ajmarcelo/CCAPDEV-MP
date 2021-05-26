const homeCtrler = {
    getHome: function (req, res) {
        res.render('home');
    },

    postHome: function(req, res) {
        var errors = validationResult(req);
        var query = {plant: req.body.search};

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('contact', details);
        }

        else {
            var details = {};
            db.findMany(Post, query, '', function(result) {
                if(result) {
                    details.posts = result;
                    res.render('searchResults', details);
                }

                else {
                    res.render('error');
                }
            });
        }
    }
}

module.exports = homeCtrler;