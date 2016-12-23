var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        unique: true
    },
    provider: String,
    password: String
});

var validatePresenceOf = value => value && value.length;

UserSchema.path('email').validate(function(email, fn) {
    var User = mongoose.model('User');
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function(err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Email already exists');


// UserSchema.pre('save', function(next) {
//     if (!this.isNew) return next();
//     if (!validatePresenceOf(this.password)) {
//         next(new Error('Invalid password'));
//     } else {
//         next();
//     }
// });

mongoose.model('User', UserSchema);
