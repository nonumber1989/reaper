var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    nickName: String,
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
    email: String,
    avatar: String,
    authority: {
        type: String,
        enum: ['Admin', 'Normal']
    }
});
mongoose.model('User', UserSchema);
