var Promise = require("bluebird");

var forPromise = function(param, callback) {
	// callback(null,param);
	if (param === "nonumber1989") {
		callback(null, param);
	} else {
		var error = new Error("nonumber1989 error !");
		callback(error);
	}
};

var thePromise = Promise.promisify(forPromise);
thePromise("nonumber1989").then(function(value) {
		console.log(value);
		return value + "--for next step";
	}).then(function(value) {
		console.log(value);
	})
	.catch(function(err) {
		console.log(err);
	});