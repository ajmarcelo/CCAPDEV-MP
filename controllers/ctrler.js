const db = require('../model/db.js');
const Plant = require('../model/plant.js');

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
    getTableOfContents: function(req,res) {
        db.findMany (Plant, {}, '', function (result) {
            if (!result)
                res.render('index');
            else {
                var details = {
                    plants: result
                }
                res.render('toc', details);
            }            
        });
    },

    getPlantSection: function(req,res) {
        var query = {pName: req.params.pName};

        var details = {};

        db.findOne(Plant, query, '', function(result) {
            if(result != null) {
                details.pName = result.pName;
                details.pScientific = result.pScientific;
                details.pInOut = result.pInOut;
                details.pWater = result.pWater;
                details.pOrigin = result.pOrigin;
                details.pLight = result.pLight;
                details.pFamily = result.pFamily;
                details.pPhoto = result.pPhoto;

                db.findMany(Post, {plant: pName}, '', function(result) {
                    details.posts = result;
                });

                res.render('plant', details);
            }

            else {
                res.render('error');
            }
        });
    }
}

module.exports = ctrler;