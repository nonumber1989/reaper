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

var thorRouters = function(thor) {
	thor.use('/thor', router.thor);
	thor.use('/speakers', router.speakers);
	thor.use('/accounts', router.accounts);
	thor.use('/schedules', router.schedules);
	thor.use('/gridfs', router.gridfs);
	console.log('thor router');
};

module.exports.routers = thorRouters;
