const express = require ("express");
const accountCtrler = require("../Controllers/accountCtrler.js");
const contactUsCtrler = require("../Controllers/contactUsCtrler.js");
const ctrler = require ("../Controllers/ctrler.js");
const homeCtrler = require ("../Controllers/homeCtrler.js");
const logInCtrler = require ("../Controllers/logInCtrler.js");
const logOutCtrler = require ("../Controllers/logOutCtrler.js");
const postCtrler = require ("../Controllers/postCtrler.js");
const signUpCtrler = require ("../Controllers/signUpCtrler.js");
const validation = require ("../Helpers/validation.js");
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