var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongooseSchema = mongoose.model("MongooseSchema");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');

//view date by pagenation
router.get('/', function(req, res, next) {
    var pagenation = requestUtils.getPagenation(req);
    MongooseSchema.find({}, {}, pagenation, function(err, result) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (result) {
                res.json({
                    type: true,
                    data: result
                });
            } else {
                res.json({
                    type: false,
                    data: "no data found"
                });
            }
        }
    })
});

router.get('/:id', function(req, res, next) {
    var queryPromise = MongooseSchema.findById(new ObjectId(req.params.id)).exec();
    queryPromise.then(function(result) {
        if (result) {
            res.json({
                type: true,
                data: result
            })
        } else {
            res.json({
                type: false,
                data: "result: " + req.params.id + " not found"
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
//create a new record
router.post('/', function(req, res, next) {
    var theSchema = new MongooseSchema(req.body);
    theSchema.save().then(function(result) {
        res.json({
            type: true,
            data: result
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
    var theSchema = new MongooseSchema(req.body);
    theSchema.findByIdAndUpdate(new ObjectId(req.params.id), {
        name: theSchema.name
    }, function(err, result) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (result) {
                res.json({
                    type: true,
                    data: result
                })
            } else {
                res.json({
                    type: false,
                    data: "result: " + req.params.id + " not found"
                })
            }
        }
    })
});

router.delete('/:id', function(req, res, next) {
    MongooseSchema.findByIdAndRemove(new Object(req.params.id)).then(function() {
        res.json({
            type: true,
            data: "result: " + req.params.id + " deleted successfully"
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
