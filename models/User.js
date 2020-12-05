const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  want: {
    type: [mongoose.Schema.Types.ObjectId)],
    ref: "band"
  },
  seen: {
    type: [mongoose.Schema.Types.ObjectId)],
    ref: "band"
  },
});

module.exports = mongoose.model("user", UserSchema);
