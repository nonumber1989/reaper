var responseCommon = function(response, statusCode, message) {
	response.status(statusCode);
	response.json({
		status: statusCode,
		errorMessage: message
	});
};

var resourceNotFoundError = function(response, identification) {
	if (identification) {
		responseCommon(response, 404, "record " + identification + " not found");
	} else {
		responseCommon(response, 404, "record not found");
	}
};

var resourcesNotFoundError = function(response, message) {
	if (message) {
		responseCommon(response, 404, message);
	} else {
		responseCommon(response, 404, "record not found");
	}
};

var internalError = function(response, error) {
	responseCommon(response, 500, error.message);
};

var deletedSuccessfully = function(response, identification) {
	if (identification) {
		responseCommon(response, 200, "record " + identification + " has been deleted successfully");
	} else {
		responseCommon(response, 200, "record has been deleted successfully");
	}
};

exports.resourceNotFoundError = resourceNotFoundError;
exports.resourcesNotFoundError = resourcesNotFoundError;
exports.internalError = internalError;
exports.deletedSuccessfully = deletedSuccessfully;