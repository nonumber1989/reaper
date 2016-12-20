var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LetterSchema = new Schema({
    subject: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    sendFrom: String,
    sendTo: [String]
}, { timestamps: true });

mongoose.model('Letter', LetterSchema);
