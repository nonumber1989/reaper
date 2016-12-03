var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    email: String,
    authority: {
        type: String,
        enum: ['Admin', 'Normal']
    }
});
mongoose.model('Account', AccountSchema);
