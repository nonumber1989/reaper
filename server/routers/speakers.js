var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Speaker = mongoose.model("Speaker");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');

//view speakers by pagenation
router.get('/', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    Speaker.find({}, {}, pagenation, function(err, speakers) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (speakers) {
                res.json({
                    type: true,
                    data: speakers
                });
            } else {
                res.json({
                    type: false,
                    data: "no speakers found"
                });
            }
        }
    })
});

router.get('/:id', function(req, res, next) {
    var queryPromise = Speaker.findById(new ObjectId(req.params.id)).exec();
    queryPromise.then(function(speaker) {
        if (speaker) {
            res.json({
                type: true,
                data: speaker
            })
        } else {
            res.json({
                type: false,
                data: "speaker: " + req.params.id + " not found"
            })
        }
    }).catch(function(err) {
        res.status(500);
        res.json({
            type: false,
            data: "Error occured: " + err
        })
    })
});
//create a new speaker
router.post('/', function(req, res, next) {
    var theSpeaker = new Speaker(req.body);
    theSpeaker.save().then(function(speaker) {
        res.json({
            type: true,
            data: speaker
        })
    }).catch(function(err) {
        res.status(500);
        res.json({
            type: false,
            data: "Error occured: " + err
        })
    });

});

router.put('/:id', function(req, res, next) {
    var theSpeaker = new Speaker(req.body);
    Speaker.findByIdAndUpdate(new ObjectId(req.params.id), {
        name: theSpeaker.name
    }, function(err, speaker) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (speaker) {
                res.json({
                    type: true,
                    data: speaker
                })
            } else {
                res.json({
                    type: false,
                    data: "speaker: " + req.params.id + " not found"
                })
            }
        }
    })
});

router.delete('/:id', function(req, res, next) {
    Speaker.findByIdAndRemove(new Object(req.params.id)).then(function() {
        res.json({
            type: true,
            data: "speaker: " + req.params.id + " deleted successfully"
        })
    }).catch(function(err) {
        res.status(500);
        res.json({
            type: false,
            data: "Error occured: " + err
        })
    })
});

module.exports = router;