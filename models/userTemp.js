const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const userTempSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, uinque: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
    cert: { type: Boolean, required: true, default: false },
    verifyCode: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userTempSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

userTempSchema.statics.create = function (payload) {
  const userData = new this(payload);

  return userData.save();
};

userTempSchema.statics.findAll = function () {
  return this.find();
};

userTempSchema.statics.findOneByEmail = function (email) {
  return this.find({ email });
};

userTempSchema.statics.findOneByVerifyCode = function (verifyCode) {
  return this.find({ verifyCode });
};

userTempSchema.statics.deleteOneByVerifyCode = function (verifyCode) {
  return this.deleteMany({ verifyCode });
};

module.exports = mongoose.model("UserTemp", userTempSchema);
