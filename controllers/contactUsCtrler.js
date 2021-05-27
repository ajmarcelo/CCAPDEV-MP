const { validationResult } = require('express-validator');
const ContactUs = require('../model/contact.js');

const contactUsCtrler = {
    getContactUs: function (req, res) {
        res.render('contact');
    },

    postContactUs: function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

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
                        res.render('contact');
                    }
                });
        }   	   	
    }
}

module.exports = contactUsCtrler;