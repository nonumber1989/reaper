/**
 *  Artwork definition
 * @type {Artist}
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtworkSchema = new Schema({
    artworkName: String,
    alias: String,
    createdTime: Date,
    description: String,
    domain: String
});
mongoose.model('Artwork', ArtworkSchema);