var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FollowSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    createdAt: Date,
    updatedAt: Date
});
mongoose.model('Follow', FollowSchema);
