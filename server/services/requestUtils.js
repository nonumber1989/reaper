var url = require('url');
var jwt = require('jsonwebtoken');

var getPagenationByUrl = function(requestUrl) {
    var pagenation = url.parse(requestUrl, true).query;

    if (pagenation.offset != undefined && typeof pagenation.offset == Number) {
        offset = pagenation.offset;
    } else {
        pagenation.offset = 0;
    }

    if (pagenation.limit != undefined && typeof pagenation.offset == Number) {
        limit = pagenation.limit;
    } else {
        pagenation.limit = 5;
    }
    return pagenation;
};

//from Header Or Query String
var getToken = function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
var getAccount = function(req) {
    var token = getToken(req);
    var decoded;
    if (token) {
        decoded = jwt.decode(token);
    } else {
        decoded = null;
    }
    return decoded;
}

exports.getPagenation = function(request) {
    if (request instanceof Object) {
        return getPagenationByUrl(request.url);
    } else {
        return getPagenationByUrl(request)
    }
};

exports.getQuery = function(request) {
    if (request instanceof Object) {
        return url.parse(request.url, true).query;
    } else {
        return url.parse(request, true).query;
    }
};

exports.getAccount = getAccount;