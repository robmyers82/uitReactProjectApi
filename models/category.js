var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/reactproject');

var mongoSchema =   mongoose.Schema;
var categorySchema  = {
    "name" : String,
    "description" : String,
    "photo" : String
};

module.exports = mongoose.model('categories', categorySchema);