var mongoose = require('mongoose');
var schema = mongoose.Schema;
var schema = new schema({year:String,value:Number });


// var revenueSchema = new schema({
// 	year:{type:String},
// 	value:{type:Number}
// });


// module.exports = mongoose.model('Revenue',revenueSchema);
schema.set('collection', 'test');

//var collectionName = 'test'
module.exports = mongoose.model('test', schema);