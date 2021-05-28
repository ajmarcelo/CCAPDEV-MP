const { validationResult } = require('express-validator');
const ContactUs = require('../model/contact.js');

const contactUsCtrler = {
    getContactUs: function (req, res) {
        var details = {role: req.session.role};
        res.render('contact', details);
    },

    postContactUs: function (req, res) {
        var errors = validationResult(req);
        var details = {role: req.session.role};
        if (!errors.isEmpty()) {
            errors = errors.errors;

            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('contact', details);
        }

        else {
            var feedback = req.body.msg;
            
                var fback = {
 					feedback: feedback                  
                }
                db.insertOne(ContactUs, fback, function(flag) {
                    if(flag) {
                        res.render('contact', details);
                    }
                });
        }   	   	
    }
}

module.exports = contactUsCtrler;