const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  address: {
    address: String,
    postCode: String,
    city: String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
