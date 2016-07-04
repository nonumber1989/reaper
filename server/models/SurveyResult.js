var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	title: String,
	type: String,
	choisce: String,
	items: [{
		key: String,
		value: String
	}],
	max: Number,
	step: Number,
	min: Number,
	answer: Schema.Types.Mixed
});

var SuerveyResultSchema = new Schema({
	questions: [QuestionSchema],
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