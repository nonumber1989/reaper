/**
 * Created by seven on 2015/9/27.
 */
var mongoose = require('mongoose'),
    OwnBook = mongoose.model("OwnBook"),
    ObjectId = mongoose.Types.ObjectId

exports.viewOwnBooks = function (req, res) {
    OwnBook.find({user:'12233333'}, function (err, ownBooks) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (ownBooks) {
                res.json({
                    type: true,
                    data: ownBooks.ownBooks
                })
            } else {
                res.json({
                    type: false,
                    data: "OwnBooks not found"
                })
            }
        }
    })
}

exports.updateOwnBook = function (req, res, next) {
    var updatedOwnBookModel = new OwnBook(req.body);
    console.log(updatedOwnBookModel)
    OwnBook.update(
        {"comments._id": new ObjectId(req.params.id)},
        {"$set": {"comments.$.text": updatedCommentModel.text, "comments.$.author": updatedCommentModel.author}},
        function (err) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: "OwnBook: " + req.params.id + " updated"
                })
            }
        })
}

exports.deleteOwnBook = function (req, res, next) {
    Article.findOneAndUpdate({"comments._id": new ObjectId(req.params.id)},
        {"$pull": {"comments": {"_id": new ObjectId(req.params.id)}}},
        function (err, article) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                if (article) {
                    res.json({
                        type: true,
                        data: article
                    })
                } else {
                    res.json({
                        type: false,
                        data: "Comment: " + req.params.id + " not found"
                    })
                }
            }
        })
}
