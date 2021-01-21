const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bandStatus: {
        type: String
    },
    bandname: {
        type: String
    },
    date: {
    type: Date,
    default: Date.now,
    },
});

module.exports = mongoose.model("feed", FeedSchema);