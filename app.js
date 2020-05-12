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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    name: 'session-id',
    secret: 'signed-key',
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

const UserRouter = require("./routes/UserRouter");
app.use(UserRouter);
app.get("/", (req, res) => {
    res.send("Welcome to the world created by bhavik chavda");
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});