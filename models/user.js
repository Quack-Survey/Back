const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, uinque: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
    cert: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.statics.create = function (payload) {
  const userData = new this(payload);

  return userData.save();
};

userSchema.statics.findAll = function () {
  return this.find();
};

userSchema.statics.findOneByUserId = function (userId) {
  return this.find({ _id: userId });
};

userSchema.statics.findOneByEmail = function (email) {
  return this.find({ email });
};

userSchema.statics.findOneByUserId = function (userid) {
  return this.find({ _id: userid });
};

userSchema.statics.updateByUserId = function (userid, payload) {
  return this.updateOne({ _id: userid }, payload);
};

userSchema.statics.updateByEmail = function (email, payload) {
  return this.updateOne({ email }, payload);
};

userSchema.statics.deleteByUserId = function (userid) {
  return this.deleteMany({ _id: userid });
};

userSchema.statics.deleteByEmail = function (email) {
  return this.deleteMany({ email });
};

module.exports = mongoose.model("User", userSchema);
