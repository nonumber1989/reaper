/**
 *  Artist definition
 * @type {Artist}
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    familyName: String,
    givenName: String,
    alias: String,
    avatar: String,
    birthday: Date,
    description: String,
    domain: String
});
mongoose.model('Artist', ArtistSchema);