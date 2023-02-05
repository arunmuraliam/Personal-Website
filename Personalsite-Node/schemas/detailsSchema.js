var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var details = mongoose.Schema({
    fname:String,
    lname:String,
    role:String,
    skills:[String],
    image:{
        data: Buffer, 
        contentType: String
    },
    hobbies:[String],
})

var Details = mongoose.model('mydetails',details,);

module.exports = {
    Details:Details
}