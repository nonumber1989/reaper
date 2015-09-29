var mongoose = require('mongoose'),
    Insight = mongoose.model("Insight"),
    ObjectId = mongoose.Types.ObjectId

/**
 * create an insight after create a user
 * @param req
 * @param res
 * @param next
 */
exports.createInsight = function (req, res, next) {
    var insightModel = new Insight(req.body);
    insightModel.save(function (err, insight) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: insight
            })
        }
    })
}

/**
 * update own books
 * @param req
 * @param res
 * @param next
 */
exports.addOwnBook = function (req, res, next) {
    //5609444a06fac9840c39adfa
    var ownBook = req.body;
    //var userId = req.query.id;
    var userId = '5609444a06fac9840c39adfa';
    Insight.findOneAndUpdate(
        {user: userId},
        {$push: {ownBooks: ownBook}},
        {safe: true, upsert: true},
        function (err, insight) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: insight
                })
            }
        }
    );
}

exports.deleteOwnBook = function (req, res, next) {
    //5609444a06fac9840c39adfa
    var ownBook = { "isbn10":"222222222"};
    //var userId = req.query.id;
    var userId = '5609444a06fac9840c39adfa';
    Insight.findOneAndUpdate(
        {user: userId},
        {$pull: {ownBooks: ownBook}},
        {safe: true, upsert: true},
        function (err, insight) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: insight
                })
            }
        }
    );
}

exports.updateOwnBook = function (req, res, next) {
    console.log("test--------------")
    //5609444a06fac9840c39adfa
    var isbn10 ='22222222';
    //var userId = req.query.id;
    var userId = '5609444a06fac9840c39adfa';
    Insight.update(
        { 'ownBooks._id': '560aa62c69dfc3001968aac9' },
        { $set: {
            'ownBooks.$.count': 1,
            'ownBooks.$.description': "It is ok"
        }},
        function (err, insight) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: insight
                })
            }
        }
    );
}

exports.addReadBook = function (req, res, next) {

}
exports.deleteReadBook = function (req, res, next) {

}