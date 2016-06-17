exports.unless = function(paths, middleware) {
    return function(req, res, next) {
    	var index = paths.indexOf(req.path);
        if (index > 0) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

