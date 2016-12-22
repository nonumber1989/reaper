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

router.post('/categories', function(req, res, next) {
    var theCategory = new Category(req.body);
    theCategory.save().then(function(category) {
        res.json(category);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

router.delete('/categories/:id', function(req, res, next) {
    // Category.findById(new Object(req.params.id)).then(function(category) {
    //     category.remove();
    //     res.status(200).end();
    // }).catch(function(err) {
    //     responseUtils.internalError(res, err);
    // });

    Category.findOneAndRemove({ _id: new Object(req.params.id) }).then(function(category) {
        res.status(200).end();
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.put('/categories/:id', function(req, res, next) {
    var theCategory = req.body;
    var updatePromise = Category.findByIdAndUpdate(new ObjectId(req.params.id), theCategory).exec();
    updatePromise.then(function(category) {
        if (category) {
            res.status(204).end();
        } else {
            responseUtils.resourceNotFoundError(res, req.params.id);
        }
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.get('/categories', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Category.find({}, {}, pagenation).exec();
    queryPromise.then(function(categories) {
        res.json(categories);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

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

router.get('/channels', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Channel.find({}, {}, pagenation).exec();
    queryPromise.then(function(channles) {
        res.json(channles);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

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

router.get('/topics', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Topic.find({}, {}, pagenation).exec();
    queryPromise.then(function(topics) {
        res.json(topics);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.post('/letters', function(req, res, next) {
    var theLetter = new Letter(req.body);
    theLetter.save().then(function(letter) {
        res.json(letter);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

router.get('/letters', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Letter.find({}, {}, pagenation).exec();
    queryPromise.then(function(letters) {
        res.json(letters);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

router.post('/messages', function(req, res, next) {
    var theMessage = new Message(req.body);
    theMessage.save().then(function(message) {
        res.json(message);
    }).catch(function(err) {
        res.status(400);
        res.json(err);
    });
});

router.get('/messages', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    var queryPromise = Message.find({}, {}, pagenation).exec();
    queryPromise.then(function(messages) {
        res.json(messages);
    }).catch(function(err) {
        responseUtils.internalError(res, err);
    });
});

module.exports = router;
