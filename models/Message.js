var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    namespce: String,
    type: {
        type: String,
        enum: ['Category', 'Channel', 'Topic', 'Letter']
    },
    subject: {
        type: String,
        required: true
    },
    format: String,
    message: String,
    sendTo: [String]
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
