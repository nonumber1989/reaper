'use strict';

var fs = require('fs');
//the router
var router = {};
var routers_path = process.cwd() + '/server/routers';
fs.readdirSync(routers_path).forEach(function(file) {
	if (file.indexOf('.js') != -1) {
		router[file.split('.')[0]] = require(routers_path + '/' + file)
	}
});

var reaperRouters = function(reaper) {
	reaper.use('/questions', router.questions);
	reaper.use('/accounts', router.accounts);
	reaper.use('/gridfs', router.gridfs);
	console.log('reaper router');
};

module.exports.routers = reaperRouters;