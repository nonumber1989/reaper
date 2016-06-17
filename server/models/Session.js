var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
	 	    sessionId: Number,
 			name: String,
 			location: String,
 			description: String,
 			speakerNames: [String],
 			timeStart: Date,
 			timeEnd: Date,
 			tracks: [String],
            createdTime: {type: Date, default: Date.now}
});
mongoose.model('Session', SessionSchema);