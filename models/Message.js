var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
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
    sendTo: [String],
    avatar: String
}, { timestamps: true });

MessageSchema.plugin(mongooseMessage);

mongoose.model('Message', MessageSchema);
