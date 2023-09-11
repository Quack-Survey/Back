const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

adminSchema.statics.create = function (payload) {
  const adminData = new this(payload);

  return adminData.save();
};

adminSchema.statics.findAll = function (payload) {
  return this.find(payload);
};

module.exports = mongoose.model("Admin", adminSchema);
