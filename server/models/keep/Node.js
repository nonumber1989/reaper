var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
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
    labelIds: [
        {
            labelId: String,
            deleted: Date
        }
    ],
    blob: {
        kind: String,
        type: String,
        blob_id: String,
        media_id: String,
        mimetype: String,
        byte_size: Number,
        width: Number,
        height: Number,
        extracted_text: String,
        extraction_status: String
    },
    baseVersion: Number,
    nodeSettings: {
        newListItemPlacement: String,
        checkedListItemsPolicy: String,
        graveyardState: String
    },
    isArchived: Boolean,
    color: String,
    sortValue: Number,
    reminders: [
        {
            state: String,
            description: String,
            serverId: String,
            due: {
                year: Number,
                month: Number,
                day: Number,
                hour: Number,
                minute: Number,
                second: Number
            }
        }
    ]
});
mongoose.model('Node', NodeSchema);