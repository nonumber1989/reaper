/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnnotationSchema = new Schema({
    id: String,
    bookId: String,
    book: Book,
    authorId: String,
    authorUser: User,
    chapter: String,
    pageNo: Number,
    privacy: Number,
    abstract: String,
    content: String,
    abstract_photo: String,
    photos: {},
    lastPhoto: String,
    commentsCount: Number,
    hasMath: Boolean,
    time: Date
});
mongoose.model('Annotation', AnnotationSchema);