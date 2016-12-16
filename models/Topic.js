var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    topicName: {
        type: String,
        required: true
    },
    topicDescription: String,
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});

TopicSchema.index({ channel: 1, topicName: 1 }, { unique: true });

mongoose.model('Topic', TopicSchema);
