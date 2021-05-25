const contactUsCtrler = {
    getContactUs: function (req, res) {
        res.render('contact');
    },

    postContactUs: function (req, res) {
          //start temporary
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
        // end temporary    
            res.render('contact', details);
        }

        else {
            var feedback = req.body.msg;
            
                var fback = {
 					feedback: feedback                  
                }
                db.insertOne(ContactUs, fback, function(flag) {
                    if(flag) {
                        res.render('contact');
                    }
                });
        }   	   	
    }
}

module.exports = contactUsCtrler;