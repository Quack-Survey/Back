const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const expireAuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, uinque: true },
    verifyCode: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

expireAuthSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

expireAuthSchema.statics.create = function (payload) {
  const userData = new this(payload);

  return userData.save();
};

expireAuthSchema.statics.findAll = function () {
  return this.find();
};

expireAuthSchema.statics.findOneByEmail = function (email) {
  return this.find({ email });
};

expireAuthSchema.statics.findOneByVerifyCode = function (verifyCode) {
  return this.find({ verifyCode });
};

expireAuthSchema.statics.deleteOneByVerifyCode = function (verifyCode) {
  return this.deleteMany({ verifyCode });
};

module.exports = mongoose.model("ExpireAuth", expireAuthSchema);
