var mongoose = require('mongoose'),
    User = mongoose.model("User")
    Insight = mongoose.model("Insight")
    ObjectId = mongoose.Types.ObjectId

exports.createUser = function (req, res, next) {
    var userModel = new User(req.body);
    userModel.save(function (err, user) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {

            var insight = new Insight({
                user:user._id,
                description:"Insight for user"+user._id
            });
            insight.save(function (err) {
                if (err) return handleError(err);
                // thats it!
            });
            user.password = undefined;
            res.json({
                type: true,
                data: user
            })
        }
    })
}

exports.viewUser = function (req, res) {
    User.findById(new ObjectId(req.params.id), function (err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateUser = function (req, res, next) {
    var updatedUserModel = new User(req.body);
    User.findByIdAndUpdate(new ObjectId(req.params.id), updatedUserModel, function (err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteUser = function (req, res, next) {
    User.findByIdAndRemove(new Object(req.params.id), function (err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "User: " + req.params.id + " deleted successfully"
            })
        }
    })
}
