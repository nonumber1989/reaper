var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
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
    avatar: String
}, { timestamps: true });

TopicSchema.index({ channel: 1, name: 1 }, { unique: true });
TopicSchema.plugin(mongooseMessage);

mongoose.model('Topic', TopicSchema);
