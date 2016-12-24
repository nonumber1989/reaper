var url = require('url');

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

