var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    notificationName: String,
    notificationDescription: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
    notificationFrom: String,
    notificationTo: String
});

mongoose.model('Notification', NotificationSchema);
