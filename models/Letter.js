var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
var Schema = mongoose.Schema;

var LetterSchema = new Schema({
    subject: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    sendFrom: String,
    sendTo: [String]
}, { timestamps: true });

LetterSchema.plugin(mongooseMessage);

mongoose.model('Letter', LetterSchema);
