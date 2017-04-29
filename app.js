var authConfig = require('./config/secrets'),
  express = require('express'),
  passport = require('passport'),
  SECRETS = require("./config/secrets"),
  authRoutes = require("./routes/authRoutes"),
  uploadRoutes = require("./routes/uploadRoutes");

passport.serializeUser((user, done) => {

  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

var app = express();
app.set('view engine', 'hbs');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    user: req.user
  });
});


app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', {
    user: req.user
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening...");
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
