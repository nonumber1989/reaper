var mongoose = require("mongoose");
var mongooseMessage = require('../middlewares/mongooseMessagePlugin');
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
    avatar: String,
    eventIdentifier: String
}, { timestamps: true });

// CategorySchema.virtual('eventMessage').get(function () {
//   return this.namespace + ':' + this.name;
// });

// CategorySchema.pre('save', function(next) {
//     if (this.isNew) {
//         this.eventIdentifier = this.namespace+":"+this.name;
//         next();
//     } else {
//         return next();
//     }
// });

CategorySchema.index({ namespace: 1, name: 1 }, { unique: true });
CategorySchema.plugin(mongooseMessage);

mongoose.model('Category', CategorySchema);
