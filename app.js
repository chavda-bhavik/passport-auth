const mongoose = require("./db/db");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
var authenticate = require('./authenticate');
var session = require("express-session");
var fileStore = require("session-file-store")(session);

const PORT = process.env.PORT || 8080;
const app = express();

// app.configure(function() {
    //app.use(express.logger());
    // app.use(express.methodOverride());
    // app.use(express.session({ secret: 'bhavik' }));
    // app.use(app.router);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        name: 'session-id',
        secret: 'bhavik',
        saveUninitialized: false,
        resave: false,
        store: new fileStore()
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/public'));
// });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

const UserRouter = require("./routes/UserRouter");
app.use(UserRouter);

app.get("/", (req, res) => {
    res.render('index');
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});