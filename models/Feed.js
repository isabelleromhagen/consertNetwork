const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    bandStatus: {
        type: String,
        required: true
    },
    bandname: {
        type: String,
        required: true
    },
    date: {
    type: Date,
    default: Date.now,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
            }
        }
    ],
    comments: [
        {
            user: {
               type: Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true
            },
            username: {
                type: String
            },
            userId: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model("feed", FeedSchema);