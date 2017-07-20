// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var userSchema = new Schema({
	data:{type:String}
});


 module.exports = mongoose.model('User',userSchema);