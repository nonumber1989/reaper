var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    subject: {
        type: String,
        required: true,
        unique: true
    },
    message: String,
    format: String,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String
});

mongoose.model('Message', MessageSchema);
