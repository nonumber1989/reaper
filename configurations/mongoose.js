var mongoose = require('mongoose');
var fs = require('fs');
// var mongooseMessagePlugin = require('../middlewares/mongooseMessagePlugin');
// mongoose.plugin(mongooseMessagePlugin);
var configuration = require('./configuration');
var models_path = process.cwd() + '/models';

//set mongodb url manually
process.env.MONGO_URL = configuration.mongo.mongoUrl;
console.log('MongoDB URL---' + process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, { server: { auto_reconnect: true } });
var db = mongoose.connection;

db.on('error', function(err) {
    console.error('MongoDB connection error:', err);
});
db.once('open', function callback() {
    console.info('MongoDB connection is established');
});
db.on('disconnected', function() {
    console.error('MongoDB disconnected!');
    mongoose.connect(process.env.MONGO_URL, { server: { auto_reconnect: true } });
});
db.on('reconnected', function() {
    console.info('MongoDB reconnected!');
});

fs.readdirSync(models_path).forEach(function(file) {
    if (file.indexOf('.js') != -1)
        require(models_path + '/' + file)
});
