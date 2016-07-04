var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SuerveySchema = new Schema({
	title: String,
	type: String,
	description: String,
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
mongoose.model('Survey', SuerveySchema);
