var restify = require('restify');
var fs = require('fs');
var auth = require('./auth.js');
var logger = require('morgan');
var validateRequest = require('./validateRequest.js');

var controllers = {}, controllers_path = process.cwd() + '/server/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

var server = restify.createServer({
  certificate: fs.readFileSync('C:\\Users\\steven.xu\\bitbucktSpace\\TLS\\ryans-cert.pem'),
  key: fs.readFileSync('C:\\Users\\steven.xu\\bitbucktSpace\\TLS\\ryans-key.pem'),
  name: 'sevenup'
});
server.use(logger('dev'));

//customer restify header
var restifyHeader = function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Authorization,Api-Version');
    next();
}
server.use(restifyHeader);
//for CORS OPTIONS method filter
var unknownMethodHandler = function(req, res, next) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Accept-Version,X-Access-Token,Origin,X-Requested-With,Authorization,Api-Version');
        res.header('Access-Control-Allow-Methods', res.methods.join(','));
        res.header('Access-Control-Allow-Origin',  req.headers.origin);
        return res.send(200);
    } else{
        return res.send(new restify.MethodNotAllowedError());
    }
}
server.on('MethodNotAllowed', unknownMethodHandler);
// not validate user for now
server.use(validateRequest);
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get("/", restify.serveStatic({
    directory: '../blade/app',
    default: 'index.html'
}));

// User Start
server.post('/user/login', auth.login);
// User End

// Article Start
server.post("/articles", controllers.article.createArticle)
server.put("/articles/:id", controllers.article.updateArticle)
server.del("/articles/:id", controllers.article.deleteArticle)
server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle)
server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2)

// This is comment operations referenced in article
server.put("/articles/:id/comments", controllers.article.createArticleComment)
// Article End

// Comment Start
// You can also operate on commands in Comment resource. Some of the URI below, refers to above URIs for article
server.put("/comments/:id", controllers.comment.updateComment)
server.del("/comments/:id", controllers.comment.deleteComment)
server.get("/comments/:id", controllers.comment.viewComment)
// Comment End


var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })