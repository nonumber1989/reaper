var mongoose = require('mongoose');
var crypto = require('crypto');
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
    hashedPassword: String,
    salt: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        default: ''
    }
});

var validatePresenceOf = value => value && value.length;

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });


UserSchema.path('email').validate(function(email, fn) {
    const User = mongoose.model('User');
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function(err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Email already exists');


UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
    if (!validatePresenceOf(this.password) && !this.skipValidation()) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

mongoose.model('User', UserSchema);
