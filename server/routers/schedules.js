var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = mongoose.model("Schedule");
var Session = mongoose.model("Session");
var requestUtils = require('../services/requestUtils');

//view schedules by pagenation
router.get('/', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    Schedule.find({}, {}, pagenation, function(err, schedules) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (schedules) {
                res.json({
                    type: true,
                    data: schedules
                });
            } else {
                res.json({
                    type: false,
                    data: "no schedules found"
                });
            }
        }
    })
});

//create a new schedule
router.post('/', function(req, res, next) {
    var scheduleModel = new Schedule(req.body);
    scheduleModel.save(function(err, schedule) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: schedule
            })
        }
    })
});
//create a new session
router.post('/:scheduleTitle/sessions', function(req, res, next) {
    var scheduleTitle = req.params.scheduleTitle;
    var session = new Session(req.body);
    var theOne = {
        time: Date.now(),
        sessions: [session]
    }
    Schedule.findOneAndUpdate({
        "title": scheduleTitle
    }, {
        $push: {
            "groups": theOne
        }
    }, {
        upsert: true
    }, function(err, session) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: session
            })
        }
    })
});
module.exports = router;
