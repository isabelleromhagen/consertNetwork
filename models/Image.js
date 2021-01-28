const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const ImageSchema = new mongoose.Schema({
    caption: {
        required:true,
        type: String
        },
    filename: {
            type: String
        },
    fileId : {
        type: String
        },
    date: {
        type: Date,
        default: Date.now,
  },
});

module.exports = mongoose.model("imageModel", ImageSchema);
