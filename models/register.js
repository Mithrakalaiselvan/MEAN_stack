var mongoose = require('mongoose');
var schema = mongoose.Schema;


var registerSchema = new schema({
	fName:{type:String,required:true},
	lName:{type:String,required:true},
	dob  :{type:Date,required:true},
	mobile:{type:Number,required:true,unique:true},
	email:{type:String,required:true,unique:true},
	gender:{type:String,required:true},
	country:{type:String,required:true}
});


module.exports = mongoose.model('Register',registerSchema);