var mongoose = require('mongoose'),
    Node = mongoose.model("Node"),
    ObjectId = mongoose.Types.ObjectId

exports.createNode = function (req, res, next) {
    var nodeModel = new Node(req.body);
    nodeModel.save(function (err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: article
            })
        }
    })
}

exports.viewNode = function (req, res, next) {
    Node.findById(new ObjectId(req.params.id), function (err, node) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (node) {
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Node: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateNode = function (req, res, next) {
    var updatedNodeModel = new Node(req.body);
    Node.findByIdAndUpdate(new ObjectId(req.params.id), updatedNodeModel, function (err, node) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (node) {
                res.json({
                    type: true,
                    data: node
                })
            } else {
                res.json({
                    type: false,
                    data: "Node: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteNode = function (req, res, next) {
    Node.findByIdAndRemove(new Object(req.params.id), function (err, node) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Node: " + req.params.id + " deleted successfully"
            })
        }
    })
}

