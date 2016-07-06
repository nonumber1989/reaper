var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuerveyResultSchema = new Schema({
	survey: {
		type: Schema.ObjectId,
		ref: 'Survey'
	},
	result: [{
		question: {
			type: Schema.ObjectId,
			ref: 'Question'
		},
		title: String,
		answer: Schema.Types.Mixed
	}],
	title: String,
	//common schema
	creator: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	updatedDate: {
		type: Date,
		default: Date.now
	}
});
mongoose.model('SurveyResult', SuerveyResultSchema);
