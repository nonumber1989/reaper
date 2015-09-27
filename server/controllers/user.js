var mongoose = require('mongoose'),
    User = mongoose.model("User")
    Comment = mongoose.model("Comment")
ObjectId = mongoose.Types.ObjectId

exports.createUser = function (req, res, next) {
    Comment
        .findOne({ text: "Happy" })
        //.populate('owner')
        .exec(function (err, comment) {
            if (err) return handleError(err);

            console.log('The comment is %s', comment);
            // prints "The creator is Aaron"

            console.log('The owner is %s', comment.owner);
            // prints "The creators age is null'
        })
    var UserModel = new User(req.body);
    UserModel.save(function (err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {

            var comment = new Comment({
                owner:[User._id,User._id]
            });
            comment.save(function (err) {
                if (err) return handleError(err);
                // thats it!
            });
            User.password = undefined;
            res.json({
                type: true,
                data: User
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
