const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, uinque: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.create = function (payload) {
  const userData = new this(payload);

  return userData.save();
};

userSchema.statics.findAll = function () {
  return this.find();
};

userSchema.statics.findOneByEmail = function (email) {
  return this.find({ email });
};

userSchema.statics.findOneByUserid = function (userid) {
  return this.find({ _id: userid });
};

userSchema.statics.updateByUserid = function (userid, payload) {
  return this.updateOne({ _id: userid }, payload);
};

userSchema.statics.deleteByUserid = function (userid) {
  return this.deleteMany({ _id: userid });
};

module.exports = mongoose.model("User", userSchema);
