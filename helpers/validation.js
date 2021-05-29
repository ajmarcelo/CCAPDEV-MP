const { check } = require('express-validator');

const validation = {
	//Sign Up
    signUpValid: function () {
        var validation = [
            check('fname', 'First name is required.').notEmpty(),
            check('lname', 'Last name is required.').notEmpty(),
            check('uname', 'Username is required.').notEmpty(),
            check('pword', 'Password is required.').notEmpty(),
            check('bday', 'Birthday is required.').notEmpty(),
            check('cname', 'Country is required.').notEmpty(),
            check('email', 'Email is required.').notEmpty()          
        ];

        return validation;
    },

    //Log In
    logInValid: function () {
        var validation = [
            check('uname', 'Username is required.').notEmpty(),
            check('pword', 'Password is required.').notEmpty()          
        ];

        return validation;
    },

    //Account edit
    accountEditValid: function () {
        var validation = [
            check('fName', 'First name is required.').notEmpty(),
            check('lName', 'Last name is required.').notEmpty(),
            check('password', 'Password is required.').notEmpty(),
            check('birthday', 'Birthday is required.').notEmpty(),
            check('country', 'Country is required.').notEmpty(),
            check('email', 'Email is required.').notEmpty()          
        ];

        return validation;
    },

    //Contact Us
    contactUsValid: function () {
        var validation = [
            check('msg', 'Message is required.').notEmpty()          
        ];

        return validation;
    },

    //postForm
    postFormValid: function () {
        var validation = [
            check('plant', 'Please choose a plant section.').notEmpty(),
            check('ptype', 'Please indicate the type of post.').notEmpty(),
            check('msg', 'Content is required.').notEmpty()      
        ];

        return validation;
    },

    //Comment
    commentValid: function () {
        var validation = [
            check('reply', 'Please fill up.').notEmpty()          
        ];

        return validation;
    },    

    //Confirm Delete 
    confirmDeleteValid: function() {
        var validation = [
            check('uname', 'Username is required.').notEmpty()          
        ];

        return validation;
    }
}

module.exports = validation;