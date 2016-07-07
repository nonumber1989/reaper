var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = mongoose.Schema({
  title: String,
  type: String,
  answer: Schema.Types.Mixed
});

var RegisterSchema = new Schema({
  userId: String,
  items: [ItemSchema],
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
mongoose.model('Register', RegisterSchema);
