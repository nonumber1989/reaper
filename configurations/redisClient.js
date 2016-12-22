var redis = require("redis");
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//redis client only for store 
var storeClient = redis.createClient();
storeClient.on('ready', function() {
    console.log('Store Client Ready to Redis');
});

storeClient.on('connect', function() {
    console.log('Store Client  Connected to Redis');
});

storeClient.on("error", function(err) {
    console.log("Store Client  Error " + err);
});

//redis client only for publishing event
var publishingClient = redis.createClient();
publishingClient.on('ready', function() {
    console.log('Store Client Ready to Redis');
});

publishingClient.on('connect', function() {
    console.log('Store Client  Connected to Redis');
});

publishingClient.on("error", function(err) {
    console.log("Store Client  Error " + err);
});

//redis client only for subscribe event
var subscribeClient = redis.createClient();
subscribeClient.on('ready', function() {
    console.log('Store Client Ready to Redis');
});

subscribeClient.on('connect', function() {
    console.log('Store Client  Connected to Redis');
});

subscribeClient.on("error", function(err) {
    console.log("Store Client  Error " + err);
});
module.exports = {
    storeClient: storeClient,
    publishingClient: publishingClient,
    subscribeClient: subscribeClient
};
