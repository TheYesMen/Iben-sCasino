const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { User, Friends } = require('../db/index.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: '521603210674-c3r17jn27bg4s5qefj4nnit2ccb2sj03.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:1337/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
  // register user here
  const { sub, name, picture, email } = profile._json;
  
  User.findOne({
    where: {
      email: email
    }
  }).then(function(user, done) {
    if (user) {
      return done(null, false, {
        message: 'That email is already taken'
      });

    } else {
      User.create(profile._json).then(function(newUser, done) {
        if (!newUser) {
          return done(null, false);
        }
        if (newUser) {
          return done(null, newUser);
        }
      }).catch((err) => {
        console.log('Create Error:', err);
      });
    }
  }).catch((err) => {
    console.log('FindOne Err:', err);
  });
  console.log('google:', profile._json);
  cb(null, profile);
 
}
));
