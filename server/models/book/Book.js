/**
 * Created by seven on 8/19/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    id: String,
    bookInformation: {
        title: String,
        authors: [String],
        publisher: String,
        publishedDate: Date,
        description: String,
        industryIdentifiers: [
            {
                type: {type: String, default: 'ISBN_10'},
                identifier: Number
            }
        ],
        readingModes: {
            text: Boolean,
            image: Boolean
        },
        pageCount: Number,
        printedPageCount: Number,
        dimensions: {
            height: Number
        },
        printType: BOOK,
        averageRating: Number,
        ratingsCount: Number,
        maturityRating: String,
        allowAnonLogging: Boolean,
        contentVersion: String,
        imageLinks: {
            smallThumbnail: String,
            thumbnail: String,
            small: String,
            medium: String,
            large: String,
            extraLarge: String
        },
        language: String,
        previewLink: String,
        informationLink: String,
        canonicalBookLink: String
    },
    saleInformation: {
        country: String,
        saleability: String,
        isEBook: Boolean
    },
    accessInformation: {
        country: String,
        viewAbility: String,
        embeddable: Boolean,
        publicDomain: Boolean,
        textToSpeechPermission: String,
        ePub: {
            isAvailable: Boolean
        },
        pdf: {
            isAvailable: Boolean
        },
        webReaderLink: String,
        accessViewStatus: String,
        quoteSharingAllowed: Boolean
    }
});
mongoose.model('Book', BookSchema);
