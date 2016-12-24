var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    avatar: String
}, { timestamps: true });


ChannelSchema.index({ parent: 1, name: 1 }, { unique: true });
ChannelSchema.plugin(mongooseMessage);

mongoose.model('Channel', ChannelSchema);
