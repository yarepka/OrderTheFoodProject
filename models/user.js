let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt-nodejs");

let userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, required: true },
  isAdmin: { type: Boolean }
});

// helper methods
// adds methods to the userSchema
userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

// validates the passwords
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);