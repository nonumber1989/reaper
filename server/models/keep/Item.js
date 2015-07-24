var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    id: String,
    etag: String,
    kind: String,
    metadata:{
        identityInfo:{
            originalLookupToken:String
        },
        sourceIds:[{
            container: String,
            id: String
        }],
        contacts:[String],
        ownerId:String,
        ownerUserTypes:[String],
        objectType:String,
        profileOwnerStats:{
            incomingAnyCircleCount:Number
        },
        lastUpdateTimeMicros:Date,
        names:[
            {
                displayName: String,
                familyName: String,
                givenName: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerContactId: String,
                    containerId: String,
                    primary: Boolean,
                    visibility:Boolean
                }
            }
        ],
        nicknames:[
            {
                value: String,
                type: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        birthdays:[
            {
                date: Date,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean
                }
            }
        ],
        genders: [
            {
                value: String,
                formattedValue: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        profileUrl:String,
        images: [
            {
                url: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        relationshipStatuses: [
            {
                value: String,
                formattedValue: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        relationshipInterests: [
            {
                value: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        organizations: [
            {
                name: String,
                title: String,
                type: String,
                startDate: Date,
                endDate: Date,
                current: Boolean,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        occupations: [
            {
                value: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        skills: [
            {
                value: String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        placesLived: [
            {
                value: String,
                current: Boolean,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String
                }
            }
        ],
        emails: [
            {
                value:String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String,
                    edgeKey: Boolean
                }
            }
         ],
        coverPhotos: [
            {
                url:String,
                metadata: {
                    writeable: Boolean,
                    container: String,
                    containerId: String,
                    primary: Boolean,
                    visibility: String,
                }
            }
        ],
        ageRange: String,
        sortKeys: {
            name: String,
            firstName: String,
            lastName: String,
            interactionRank: Number
        },
        legacyFields: {
            mobileOwnerId: String
        },
        inAppReachability: [
            {
                status: String,
                appType: String
            }
        ]
    }
});
mongoose.model('Item', ItemSchema);