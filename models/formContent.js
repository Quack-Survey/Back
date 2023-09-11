const mongoose = require("mongoose");

const Form = mongoose.model("Form");

const formContentShema = new mongoose.Schema(
  {
    text: { type: String, required: false },
    select: { type: Array, required: true },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Form,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

formContentShema.statics.create = function (payload) {
  const formContentData = new this(payload);
  return formContentData.save();
};

formContentShema.statics.findAll = function (payload) {
  return this.find(payload);
};

formContentShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

formContentShema.static.deleteMany = function (payload) {
  return this.deleteMany(payload);
};

module.exports = mongoose.model("FormContent", formContentShema);
