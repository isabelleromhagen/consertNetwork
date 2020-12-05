const mongoose = require("mongoose");

const BandSchema = new mongoose.Schema({
    bandname: {
        type: String,
        required: true
    }
    imageURL: {
        type: String
    }
});

module.exports = mongoose.model("band", BandSchema);
