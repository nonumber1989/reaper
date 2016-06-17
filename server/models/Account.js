var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  company: String,
  position: String,
  comment: String
});
mongoose.model('Account', AccountSchema);
