var mongoose    =   require("mongoose");

var mongoSchema =   mongoose.Schema;
var noteSchema  = {
	"refId": String,
    "note" : String
};

module.exports = mongoose.model('notes', noteSchema);