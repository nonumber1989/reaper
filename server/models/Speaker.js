var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SpeakerSchema = new Schema({
     speakerId:Number,
     name: String,
     profilePicture:String,
     about: String,
     location:String
});
mongoose.model('Speaker', SpeakerSchema);
