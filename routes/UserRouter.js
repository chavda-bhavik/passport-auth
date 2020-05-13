const express = require("express");
const router = express.Router();
const User = require("../models/User");
var passport = require("passport");

router.post('/login', passport.authenticate('local'), (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Login Successful!' })
})
router.post("/register", async (req,res) => {
    try {
        let user = await User.register(new User({ username: req.body.username }), req.body.password);
        await user.save();
        passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Signed up sucessfully' })
        })
    } catch (error) {
        res.send(error);   
    }
})
router.get("/logout", (req,res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
})

// Facebook Strategy
router.get('/facebook', passport.authenticate('facebook'), (req,res) => {})
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect:'/' }), (req,res) => {
    res.redirect("/account")
})

// Google Strategy
router.get('/google', passport.authenticate('google',  { scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ]}), (req,res) => {});
router.get('/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/account',
        failureRedirect: '/'
    }), (req,res) => {
        res.send(req.user);
    }
);


router.get('/account', function(req, res){
    res.render('account', { user: req.user });
});
router.get("/getusername", (req,res) => {
    res.send(req.session.passport.user);
})
module.exports = router;