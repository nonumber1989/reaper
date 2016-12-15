var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    channelName: {
        type: String,
        required: true
    },
    channelDescription: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});
mongoose.model('Channel', ChannelSchema);
