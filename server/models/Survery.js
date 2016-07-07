var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = mongoose.Schema({
  title: String,
  type: String,
  answer: Schema.Types.Mixed
});

var SuerveySchema = new Schema({
  userId: String,
  items: [ItemSchema],
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
