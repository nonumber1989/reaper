var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    channelName: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});

ChannelSchema.index({ category: 1, channelName: 1 }, { unique: true });

mongoose.model('Channel', ChannelSchema);
