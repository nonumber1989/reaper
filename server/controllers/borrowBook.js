/**
 * Created by seven on 2015/9/22.
 */
var mongoose = require('mongoose'),
    User = mongoose.model("User")
ObjectId = mongoose.Types.ObjectId

exports.createUser = function (req, res, next) {
    var UserModel = new User(req.body);
    UserModel.save(function (err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: User
            })
        }
    })
}