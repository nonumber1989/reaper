var express = require('express');
var router = express.Router();
var schemaUtils = require('json-schema-utils');
var requestUtils = require('../services/requestUtils');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

router.get('/', function(req, res, next) {
	var product = {
		"id": 1,
		"number": 1200,
		"date": "Tue Jul 22 2008 12:11:04 GMT-0700 (Pacific Daylight Time)",
		"dimensions": {
			"length": 7.0,
			"width": 12.0,
			"height": 9.5
		},
		"users": [{
			"name": "steven",
			"age": 28
		}]
	};
	var schema = schemaUtils.jsonSchema('Product', product);
	res.json(schema);
});

router.post('/json', function(req, res, next) {
	var query = requestUtils.getQuery(req);
	var title = query.title;
	var reaperObject = req.body;
	var schema = schemaUtils.jsonSchema(title, reaperObject);
	res.json(schema);
});


router.post('/mongoose', function(req, res, next) {
	var query = requestUtils.getQuery(req);
	var title = query.title;
	var reaperObject = req.body;
	var filePath = "./server/models/";
	var fileName = filePath + title + ".js";
	var mongooseSchema = Promise.promisify(schemaUtils.mongooseSchema);

	var routerPath = "./server/configurations/router.js";
	var replaceTemplate = "reaper.use('/theRouter', router.theRouter);"
	mongooseSchema(title, reaperObject, fileName).then(function(schema) {
		//modify the routers configuration
		fs.readFileAsync(routerPath, "utf8").then(function(content) {
			var replace = replaceTemplate.replace(/theRouter/g, title.toLowerCase() + 's') + " \n" + "	console.log('reaper router');";
			var targetContent = content.replace(/console.log\(\'reaper router\'\);/g, replace);
			return targetContent;
		}).then(function(value) {
			fs.writeFileAsync(routerPath, value, 'utf8').then(function(result) {
				// res.json(value);
			}).catch(function(error) {
				throw error;
			});
		}).catch(function(e) {
			console.error(e.stack);
		});
		//read router template and generate new router file
		var routerTemplatePath = "./server/services/routerTemplate.js";
		var routerName = "./server/routers/" + title.toLowerCase() + "s.js";
		fs.readFileAsync(routerTemplatePath, "utf8").then(function(content) {
			var replaceContent = content.replace(/MongooseSchema/g, title);
			return replaceContent;
		}).then(function(value) {
			fs.writeFileAsync(routerName, value, 'utf8').then(function(result) {
				// res.json(value);
			}).catch(function(error) {
				throw error;
			});
		}).catch(function(e) {
			console.error(e.stack);
		});

	}).then(function(result) {
		res.json({
			"mame": "222222"
		});
	}).catch(function(error) {
		console.log(error);
	});
});

module.exports = router;