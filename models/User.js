const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  fileId: {
    type: String,
  },
   want: {
    type: [String],
  },
  seen: {
    type: [String],
  },
  _id: {
    type: ObjectId,
  }
  }
);

module.exports = mongoose.model("userModel", UserSchema);
