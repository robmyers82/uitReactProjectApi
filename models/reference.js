var mongoose    =   require("mongoose");

var mongoSchema =   mongoose.Schema;
var referenceSchema  = {
	"categoryId": String,
    "name" : String,
    "description" : String,
    "refType" : String,
    "url" : String
};

module.exports = mongoose.model('references', referenceSchema);