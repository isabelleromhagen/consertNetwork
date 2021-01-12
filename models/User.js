const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

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
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
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
  // seen: {
  //   $type: [String] }
  }
  // { typeKey: '$type' }
);
  // want: {
  //   type: {type: [String]},
  // },
  // seen: {
  //   type: {type: [String]},
  // },
  
  // want: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "band"
  // },
  // seen: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "band"
  // },
// }
// );
// "seen": [{"bandname":"Amon Amarth"}, {"bandname":"Behemoth"}, {"bandname":"Craft"}]

module.exports = mongoose.model("userModel", UserSchema);
