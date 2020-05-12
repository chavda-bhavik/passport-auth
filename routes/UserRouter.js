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
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
})
router.get("/getusername", (req,res) => {
    res.send(req.session.passport.user);
})
module.exports = router;