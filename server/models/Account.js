var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  id: String,
  userName: String,
  password: String,
  phone: String,
  email: String,
  authority: {
    type: String,
    enum: ['Admin', 'Normal']
  }
});
mongoose.model('Account', AccountSchema);
