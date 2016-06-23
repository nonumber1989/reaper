var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SuerveySchema = new Schema({
  title: String,
  type: String,
  description: String
});
mongoose.model('Survey', SuerveySchema);
