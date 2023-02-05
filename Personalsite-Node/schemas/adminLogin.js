var mongoose = require('mongoose');

var adminlogin = mongoose.Schema({
    email : {type : String, unique: true},
    password : String
})

var AdminLogin = mongoose.model("adminlogin", adminlogin);

module.exports = {
    AdminLogin : AdminLogin
}