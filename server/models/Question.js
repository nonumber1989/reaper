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
mongoose.model('Question', QuestionSchema);