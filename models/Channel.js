var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    avatar: String
}, { timestamps: true });


ChannelSchema.index({ category: 1, name: 1 }, { unique: true });
ChannelSchema.plugin(mongooseMessage);

mongoose.model('Channel', ChannelSchema);
