var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Session = require("./Session");
var ScheduleSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  groups: [{
    time: String,
    sessions: []
  }],
  createdTime: {
    type: Date,
    default: Date.now
  }
});
mongoose.model('Schedule', ScheduleSchema);
