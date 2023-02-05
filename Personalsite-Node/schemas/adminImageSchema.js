var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var adminimage = mongoose.Schema({
    image:{ data: Buffer, contentType: String}
})

var AdminImage = mongoose.model('mydetails',adminimage);

module.exports = {
    AdminImage:AdminImage
}