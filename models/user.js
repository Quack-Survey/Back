const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.create = function (payload) {
  const userData = new this(payload);

  return userData.save();
};

userSchema.statics.findAll = function (payload) {
  return this.find(payload);
};

module.exports = mongoose.model("User", userSchema);
