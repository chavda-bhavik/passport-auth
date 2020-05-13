const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User");
const config = require("./config");
const { Strategy } = require("passport");

// exports.local = passport.use(new LocalStrategy(User.authenticate()));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK.CLIENT_ID,
    clientSecret: config.FACEBOOK.CLIENT_SECRET,
    callbackURL: config.FACEBOOK.CALLBACK_URL,
    passReqToCallback: true
}, async function(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ oauthID: profile.id});
        if(!user) {
            user = new User({
                oauthID: profile.id,
                name: profile.displayName,
                type: "facebook"
            });
            await user.save();
        }
        done(null, user);
    } catch(error) {
        console.log(error);  // handle errors!
        done(error, null);
    }
}))

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE.CLIENT_ID,
    clientSecret: config.GOOGLE.CLIENT_SECRET,
    callbackURL: config.GOOGLE.CALLBACK_URL,
    passReqToCallback: true
}, 
async function(request, accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ oauthID: profile.id});
        if(!user) {
            user = new User({
                oauthID: profile.id,
                name: profile.displayName,
                type: "google"
            });
            await user.save();
        }
        done(null, user);
    } catch(error) {
        console.log(error);  // handle errors!
        done(error, null);
    }
}))

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        console.log(user);
        if(!err) done(null, user);
        else done(err, null);
    });
});