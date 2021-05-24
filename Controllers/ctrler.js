const ctrler = {
    //Welcome or Index
    getIndex: function(req, res) {
    	res.render('index');
    },
    //About Us
    getAboutUs: function (req, res) {
        res.render('aboutus');
    },

    //Table of Contents
    getTableofContents: function(req,res) {
        res.render('toc');
    }
}

module.exports = ctrler;