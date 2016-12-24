var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Category = mongoose.model("Category");
var Channel = mongoose.model("Channel");
var Topic = mongoose.model("Topic");
var Letter = mongoose.model("Letter");
var Message = mongoose.model("Message");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');


router.post('/messages', function(req, res, next) {
    var theMessage = new Message(req.body);
    switch (theMessage.type) {
        case 'Category':
            执行代码块 1
            break;
        case 'Channel':
            执行代码块 2
            break;
        case 'Topic':
            执行代码块 2
            break;
        case 'Letter':
            执行代码块 2
            break;
        default:
            throw new Error('type not exist');
    }

});

router.get('/messages', function(req, res, next) {

});

module.exports = router;
