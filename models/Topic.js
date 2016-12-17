var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nescription: String,
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});

TopicSchema.index({ channel: 1, name: 1 }, { unique: true });

mongoose.model('Topic', TopicSchema);
