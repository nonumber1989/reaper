var mongoose = require('mongoose');
var Node = require("./Node");
var Schema = mongoose.Schema;

var NodesSchema = new Schema({
    kind: String,
    fromVersion: String,
    toVersion: String,
    nodes:[{ type: Schema.Types.ObjectId, ref: 'Node' }],
    truncated: Boolean,
    upgradeRecommended: Boolean
});
mongoose.model('Nodes', NodesSchema);