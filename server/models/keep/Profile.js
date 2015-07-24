var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    kind: String,
    id: Schema.Types.ObjectId,
    serverId: String,
    parentId: String,
    type: String,
    timestamps:{
        kind: String,
        created: Date,
        updated: Date,
        deleted: Date,
        trashed: Date,
        userEdited: Date
    },
    title: String,
    text: String,
    blob: {
        kind: String
    },
    baseVersion: Number,
    nodeSettings: {
        newListItemPlacement: String,
        checkedListItemsPolicy: String,
        graveyardState: String
    },
    isArchived: Boolean,
    sortValue: Number
});
mongoose.model('Profile', ProfileSchema);