/**
 * Created by seven on 8/18/2015.
 */
var restify = require('restify');

var googleApiKey = 'AIzaSyD0mWVqOnQmDYpYIKZXTvvHoAqU2Q_EQyQ';
var googleBookClient = restify.createJsonClient({
    url: 'https://www.googleapis.com'
});


exports.fetchGoogleBook = function (request, response, next) {
    var isbn = request.params.isbn;
    var isbnBookUrl = '/books/v1/volumes?q=isbn:' + isbn + '&key=' + googleApiKey;
    googleBookClient.get(isbnBookUrl, function (err, req, res, book) {
        if (err) {
            response.status(500);
            response.json({
                type: false,
                data: "Error occured: " + err
            })
        }else{
            response.json({
                type: true,
                data: book
            })
        }
    });
}
