var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Category = mongoose.model("Category");
var Channel = mongoose.model("Channel");
var Topic = mongoose.model("Topic");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');

/*
* create category
* authority needed
*/
router.post('/categories', function(req, res, next) {
    var theCategory = new Category(req.body);
    theCategory.save().then(function(category) {
        res.json(category);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});
/*
* query category
* authority needed (only view the categories in the namespace)
*/
router.get('/categories', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Category.find({}, {}, pagenation).exec();
    queryPromise.then(function(categories) {
        res.json(categories);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});
/*
* create channel
* authority needed (only creat for category)
*/
router.post('/channels', function(req, res, next) {
    var theChannel = new Channel(req.body);
    Category.count({ _id: theChannel.category }).then(function(count) {
        if (count > 0) {
            return theChannel.save();
        } else {
            throw new Error('Category not exist');
        }
    }).then(function(channel) {
        res.json(channel);
    }).catch(function(err) {
        res.status(400);
        res.json({
            message: err.message
        });
    });

});

//query channel
router.get('/channels', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Channel.find({}, {}, pagenation).exec();
    queryPromise.then(function(channles) {
        res.json(channles);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});
//create topic
router.post('/topics', function(req, res, next) {
    var theTopic = new Topic(req.body);
    Channel.count({ _id: theTopic.channel }).then(function(count) {
        if (count > 0) {
            return theTopic.save();
        } else {
            throw new Error('Channel not exist');
        }
    }).then(function(topic) {
        res.json(topic);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

//query channel
router.get('/topics', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Topic.find({}, {}, pagenation).exec();
    queryPromise.then(function(topics) {
        res.json(topics);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

module.exports = router;
