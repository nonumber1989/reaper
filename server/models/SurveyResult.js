var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuerveyResultSchema = new Schema({
	userId: String,
	surveyResult: [{
		title: String,
		type: String,
		answer: Schema.Types.Mixed
	}],
	//common schema
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
