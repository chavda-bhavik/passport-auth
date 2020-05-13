const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//     },
//     lastname: {
//         type: String
//     },
//     googleId: String,
//     facebookId: String
// }, {
//     timestamps: true
// })
const UserSchema = new mongoose.Schema({
    oauthID: Number,
    name: String,
    type: String
}, {
    timestamps: true
})
//UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User