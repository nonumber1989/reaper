var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    namespace: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    avatar: String
}, { timestamps: true });
CategorySchema.timestamps = true;
CategorySchema.index({ namespace: 1, name: 1 }, { unique: true });

mongoose.model('Category', CategorySchema);
