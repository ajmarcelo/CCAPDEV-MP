const express = require ("express");
const accountCtrler = require("../controllers/accountCtrler.js");
const commentCtrler = require("../controllers/commentCtrler.js");
const contactUsCtrler = require("../controllers/contactUsCtrler.js");
const ctrler = require ("../controllers/ctrler.js");
const homeCtrler = require ("../controllers/homeCtrler.js");
const logInCtrler = require ("../controllers/logInCtrler.js");
const logOutCtrler = require ("../controllers/logOutCtrler.js");
const postCtrler = require ("../controllers/postCtrler.js");
const signUpCtrler = require ("../controllers/signUpCtrler.js");
const validation = require ("../helpers/validation.js");

const app = express();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/post_file_upload')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname)
    }
});
const upload = multer({storage : storage});

app.get ("/", ctrler.getIndex);
app.get ("/aboutus", ctrler.getAboutUs);

app.get ("/signup", signUpCtrler.getSignUp);
app.post ("/signup", validation.signUpValid(), signUpCtrler.postSignUp);
app.get ("/getCheckUsername", signUpCtrler.getCheckUsername);

app.get("/login", logInCtrler.getLogIn);
app.post("/login", validation.logInValid(), logInCtrler.postLogIn);
app.get ("/logout", logOutCtrler.getLogOut);

app.get("/myAccount", accountCtrler.getMyAccount);
app.get("/editAccount", accountCtrler.getEditAccount);
app.post("/editAccount", validation.accountEditValid(), accountCtrler.postEditAccount);
app.get("/deleteAccount", accountCtrler.getDeleteAccount);
app.post("/deleteAccount", validation.confirmDeleteValid(), accountCtrler.postDeleteAccount);
app.get("/otherAccount/:username", accountCtrler.getOtherAccount);

app.get("/home", homeCtrler.getHome);
app.post("/home", homeCtrler.postHome);

app.get ("/viewPost/:postID", postCtrler.getPost);
app.post("/upvote/:postID", postCtrler.postUpdateUpVote);
app.post("/downvote/:postID", postCtrler.postUpdateDownVote);
app.get("/postForm", postCtrler.getPostForm);
app.post("/postForm", validation.postFormValid(), postCtrler.postPostForm);
app.post("/postForm_FileUpload/:postID", upload.single('uploadF'), postCtrler.postPostForm_FileUpload);
app.get ("/editPost/:postID", postCtrler.getEditPost);
app.post ("/editPost/:postID", validation.postFormValid(), postCtrler.postEditPost);
app.post ("/deletePost/:postID", postCtrler.postDeletePost);

app.get ("/toc", ctrler.getTableOfContents);
app.get("/plant/:pName", ctrler.getPlantSection);

app.get ("/contact", contactUsCtrler.getContactUs);
app.post ("/contact", validation.contactUsValid(), contactUsCtrler.postContactUs);

module.exports = app;