const express = require("express");
const authRouter = express.Router();
const SECRETS = require("../config/secrets");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const TwitterStrategy = require("passport-twitter");
const passport = require("passport");
passport.use(new GoogleStrategy(SECRETS.google,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  })
);

passport.use(new TwitterStrategy({
    consumerKey: SECRETS.twitter.clientID,
    consumerSecret: SECRETS.twitter.clientSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  (token, tokenSecret, profile, cb) => {
    cb();
  }
));

authRouter.get("/twitter/",
  passport.authenticate("twitter")
);

authRouter.get("/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
    successRedirect: "/"
  })
)

authRouter.get("/google",
  passport.authenticate('google', { scope: ['openid email profile'] })
);

authRouter.get("/google/callback",
  passport.authenticate("google",
  {
    failureRedirect: "/login",
    successRedirect: "/"
  }
  ),
  (req, res) => {
    res.redirect("/"); //successful auth, redirect home, but res is undefined
  }
);

authRouter
module.exports = authRouter;
