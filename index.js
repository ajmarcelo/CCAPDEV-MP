const http = require ("http");
const dotenv = require ("dotenv");
const express = require ("express");
const expresshbs = require ("express-handlebars");
const mongoose = require ("mongoose");
const mongoConnect = require ("connect-mongo");
const bodyParser = require ("body-parser");
const validator = require ("validator");
const routes = require ("./Routes/routes.js");
const db = require ("./Model/db.js");
const multer = require ("multer");
const session = require('express-session');

const app = express ();
dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use (session ({
	secret: "Plantheta", 
	resave: false, 
	saveUninitialized: false, 
	store: mongoConnect.create ({ mongoUrl: 
		"mongodb+srv://ajm:sle@cluster0.5isjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	})
}));

app.engine ("hbs", expresshbs ({
	defaultLayout: '',
    extname: '.hbs'
}));

app.use (bodyParser.urlencoded ({extended:true}));
app.use (bodyParser.json());
app.set ("view engine", "hbs");
app.use (express.static ("Public"));
app.use ("/", routes);

app.use (function (req, res) {
	res.render("error");
})

db.connect();

app.listen (port, () => {
	console.log ("The web server has started on port" + port);
})