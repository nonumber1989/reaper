var mongoose = require('mongoose');
var Node = require('./Node');
var Schema = mongoose.Schema;

var NodesSchema = new Schema({
    kind: String,
    fromVersion: String,
    toVersion: String,
    userInfo: {
        timestamps: {
            kind: String,
            created: Date,
            updated: Date
        },
        settings: {
            singleSettings: [
                {
                    type: String,
                    applicablePlatforms: [
                        String
                    ],
                    globalCheckedListItemsPolicyValue: String
                }
            ]
        },
        labels: [
            {
                name: String,
                revision: Number,
                mainId: String,
                timestamps: {
                    kind: String,
                    created: Date,
                    updated: Date,
                    deleted: Date,
                    trashed: Date,
                    userEdited: Date
                },
                lastMerged: Date
            }
        ]
    },
    nodes:[{ type: Schema.Types.ObjectId, ref: 'Node' }],
    truncated: Boolean,
    upgradeRecommended: Boolean
});
mongoose.model('Nodes', NodesSchema);