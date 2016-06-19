var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Account = mongoose.model("Account");
var ObjectId = mongoose.Types.ObjectId;
var requestUtils = require('../services/requestUtils');
var responseUtils = require('../services/responseUtils');

var Promise = require("bluebird");
mongoose.Promise = Promise;

router.get('/', function(req, res, next) {
  var pagenation = requestUtils.getPagenation(req);
  var queryPromise = Account.find({}, {}, pagenation).exec();
  queryPromise.then(function(accounts) {
    if (accounts) {
      res.json(accounts);
    } else {
      responseUtils.resourcesNotFoundError(res);
    }
  }).catch(function(err) {
    responseUtils.internalError(res,err);
  });
});

//get the account by id
router.get('/:id', function(req, res, next) {
  var queryPromise = Account.findById(new ObjectId(req.params.id)).exec();
  queryPromise.then(function(account) {
    if (account) {
      res.json(question);
    } else {
      res.status(404);
      res.json({
        status: 404,
        errorMessage: "record " + req.params.id + " not found"
      });
    }
  }).catch(function(err) {
    res.status(500);
    res.json({
      status: 500,
      errorMessage: err
    });
  });
});
//create an account
router.post('/', function(req, res, next) {
  var accountModel = new Account(req.body);
  accountModel.save(function(err, account) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      res.json({
        type: true,
        data: account
      })
    }
  })
});

// update the account by id
router.put('/:id', function(req, res, next) {
  var accountModel = new Account(req.body);
  Account.findByIdAndUpdate(new ObjectId(req.params.id), accountModel, function(err, account) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      if (account) {
        res.json({
          type: true,
          data: account
        })
      } else {
        res.json({
          type: false,
          data: "account: " + req.params.id + " not found"
        })
      }
    }
  })
});

//delete by id
router.delete('/:id', function(req, res, next) {
  Account.findByIdAndRemove(new Object(req.params.id), function(err, article) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      res.json({
        type: true,
        data: "Account: " + req.params.id + " deleted successfully"
      })
    }
  })
});

var SECRET = 'shhhhhhared-secret';
router.post('/authenticate', function(req, res, next) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === '123456789' && req.body.password === 'seven')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    userName: 'Steven.Xu',
    email: 'steven.xu@gmail.com',
    phone: '123456789',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, SECRET, {
    expiresInMinutes: 60 * 5
  });

  res.json({
    token: token
  });
});

module.exports = router;