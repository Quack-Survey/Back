const mongoose = require("mongoose");

const templateShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    targetNumber: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookMark: { type: Boolean, default: false },
    deadline: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

templateShema.statics.create = function (payload) {
  const templateData = new this(payload);
  return templateData.save();
};

templateShema.statics.findAll = function (payload) {
  return this.find(payload);
};

templateShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

templateShema.static.deleteOne = function (payload) {
  return this.deleteOne(payload);
};

module.exports = mongoose.model("Template", templateShema);
