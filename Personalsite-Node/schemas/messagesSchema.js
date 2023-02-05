var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var message = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    phone : Number,
    message : String,
    image : String
})

var Message = mongoose.model("Message",message)

module.exports = {
Message : Message
}