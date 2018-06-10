var credentials = require('./credentials.js');

//Authentication with passport
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitterStrategy(credentials.twitter,
  function(token, tokenSecret, profile, done) {
    console.log("Twitter user with id "+profile.id+" appeared!");
    done(null, { message: 'Twitter user signed in!' });
  }
));

var express = require("express");
var http = require("http");
var cookies = require("cookie-parser");
var sessions = require('express-session');

var app = express();
app.use(express.static(__dirname + "/static"));
app.use(cookies(credentials.cookieSecret));
app.use(sessions(credentials.cookieSecret));
app.use(passport.initialize());
app.use(passport.session());

http.createServer(app).listen(3005);

// Redirect the user to Twitter for authentication. 
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.
app.get('/test-login', 
  passport.authenticate('twitter', { failureRedirect: '/failure' }),
  function(req, res) {
    res.redirect('/success');
  }
);

app.get("/success", function (req, res) {
  console.log("Success!");
  res.send("User login via Twitter successful!");
});

app.get("/failure", function (req, res) {
  console.log("Failure!");
  res.send("User login via Twitter was unsuccessful!");
});


