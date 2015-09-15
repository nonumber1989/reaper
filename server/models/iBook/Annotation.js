/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnnotationSchema = new Schema({
    id: String,
    book_id: String,
    book: String,
    author_id: String,
    author_user: User,
    chapter: String,
    page_no: Number,
    privacy: Number,
    abstract: String,
    content: String,
    abstract_photo: String,
    photos: {},
    last_photo: String,
    comments_count: Number,
    hasmath: Boolean,
    time: Date
});
mongoose.model('Annotation', AnnotationSchema);