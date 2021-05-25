const express = require ("express");
const accountCtrler = require("../controllers/accountCtrler.js");
const contactUsCtrler = require("../controllers/contactUsCtrler.js");
const ctrler = require ("../controllers/ctrler.js");
const homeCtrler = require ("../controllers/homeCtrler.js");
const logInCtrler = require ("../controllers/logInCtrler.js");
const logOutCtrler = require ("../controllers/logOutCtrler.js");
const postCtrler = require ("../controllers/postCtrler.js");
const signUpCtrler = require ("../controllers/signUpCtrler.js");
const validation = require ("../helpers/validation.js");
// Will add more later

const app = express();

app.get ("/", ctrler.getIndex);
app.get ("/home", homeCtrler.getHome);

//app.get ("/results", );	// Search results (?)

app.get ("/signup", signUpCtrler.getSignUp);
//app.post ("/signup", validation.signUpValidation(), signUpCtrler.postSignUp);

app.get ("/getCheckUsername", signUpCtrler.getCheckUsername);
//app.get ("/sucess", successCtrler.getSuccess);

app.get("/login", logInCtrler.getLogIn);
app.post("/login", logInCtrler.postLogIn);

app.get ("/profile/:username", accountCtrler.getAccount);
// app.get ("/profileset/:username", );

// app.get ("/postform", );
// app.post ("/postform", );	// Both for posting and editing then posting (?)

// app.get ("/plantsection/:plant", );
// app.get ("/viewpost", );

// app.get ("/tableofcontents", );
// app.get ("/aboutus", );

// app.get ("/contactus", );
// app.post ("/contactus", );

 app.get ("/logout", logOutCtrler.getLogOut);

module.exports = app;