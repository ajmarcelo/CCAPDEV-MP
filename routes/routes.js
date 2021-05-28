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

// app.get ("/viewpost/:postID", postCtrler.getPost);

// app.get ("/postForm", postCtrler.getPostForm);
// app.post ("/postForm", postCtrler.postPostForm);

// app.get ("/editPostForm", postCtrler.getEditPostForm);
// app.post ("/editPostForm", postCtrler.postEditPostForm);

// app.post ("/?????", postCtrler.deletePost);	// Wala palang page yung delete wofeboufb

app.get ("/toc", ctrler.getTableOfContents);
app.get("/plant/:pName", ctrler.getPlantSection);

app.get ("/contact", contactUsCtrler.getContactUs);
app.post ("/contact", validation.contactUsValid(), contactUsCtrler.postContactUs);

module.exports = app;