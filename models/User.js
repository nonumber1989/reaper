var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: String,
    authority: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    refreshTokens: [{
        refreshToken: String,
        updatedAt: Date,
        type: {
            type: String,
            enum: ['web', 'mobile'],
            default: 'web'
        }
    }],
    follows: {
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        channels: [{
            type: Schema.Types.ObjectId,
            ref: 'Channel'
        }],
        topics: [{
            type: Schema.Types.ObjectId,
            ref: 'Topic'
        }],
        letters: [{
            type: Schema.Types.ObjectId,
            ref: 'Letter'
        }]
    }
}, { timestamps: true });

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
