/**
 * Created by seven on 6/8/2015.
 */
var mongoose = require('mongoose'),
    Deal = mongoose.model("Deal"),
    ObjectId = mongoose.Types.ObjectId

exports.createDeal = function (req, res, next) {
    var dealModel = new Deal(req.body);
    dealModel.save(function (err, deal) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: deal
            })
        }
    })
}

exports.viewDeal = function (req, res, next) {
    Deal.findById(new ObjectId(req.params.id), function (err, deal) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (deal) {
                res.json({
                    type: true,
                    data: deal
                })
            } else {
                res.json({
                    type: false,
                    data: "Deal: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.viewDeal_v2 = function (req, res, next) {
    Deal.find({dealNo:req.params.id}, function (err, deal) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (deal) {
                deal.title = deal.title + " v2"
                res.json({
                    type: true,
                    data: deal
                })
            } else {
                res.json({
                    type: false,
                    data: "Deal: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateDeal = function (req, res, next) {
    var updatedDealModel = new Deal(req.body);
    Deal.findByIdAndUpdate(new ObjectId(req.params.id), updatedDealModel, function (err, deal) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (deal) {
                res.json({
                    type: true,
                    data: deal
                })
            } else {
                res.json({
                    type: false,
                    data: "Deal: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteDeal = function (req, res, next) {
    Deal.findByIdAndRemove(new Object(req.params.id), function (err, deal) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Deal: " + req.params.id + " deleted successfully"
            })
        }
    })
}
