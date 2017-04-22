var authConfig = require('./config/secrets'),
  express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  TwitterStrategy = require("passport-twitter"),
  SECRETS = require("./config/secrets")

passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy(

  authConfig.google,

  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new TwitterStrategy({
    consumerKey: SECRETS.twitter.clientID,
    consumerSecret: SECRETS.twitter.clientSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    cb();
  }
));


// Express 4 boilerplate

var app = express();
app.set('view engine', 'hbs');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));


// Application routes

app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

app.get("/auth/twitter", passport.authenticate("twitter"));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid email profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Authenticated successfully
    res.redirect('/');
  });

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening...");
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
