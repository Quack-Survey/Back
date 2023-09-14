const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, uinque: true, index: true },
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

userSchema.statics.findOne = function (email) {
  return this.find({ email });
};

userSchema.statics.deleteByUserid = function (Userid) {
  return this.deleteMany({ _id: Userid });
};

module.exports = mongoose.model("User", userSchema);
