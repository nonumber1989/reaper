var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    name: String,
    phone: String,
    title: String,
    comment: String,
    created: {type: Date, default: Date.now}
});
mongoose.model('Question', QuestionSchema);