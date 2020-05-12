const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    }
}, {
    timestamps: true
})
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User