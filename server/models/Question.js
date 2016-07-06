var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	survey: {
		type: Schema.ObjectId,
		ref: 'Survey'
	},
	title: String,
	primary: Boolean,
	type: String,
	choisce: String,
	items: [{
		key: String,
		value: String
	}],
	max: Number,
	step: Number,
	min: Number,
	answer: Schema.Types.Mixed,
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
mongoose.model('Question', QuestionSchema);
