const mongoose = require("mongoose");

const formContentShema = new mongoose.Schema(
  {
    text: { type: String, required: false },
    select: { type: Array, required: true },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
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

formContentShema.statics.findAll = function (formId) {
  return this.find({ formId });
};

formContentShema.statics.updateOneByFormContentId = function (
  formId,
  updateInfo,
) {
  return this.updateOne({ formId }, updateInfo);
};

formContentShema.statics.deleteManyByFormContentId = function (payload) {
  return this.deleteMany(payload);
};

formContentShema.statics.deleteOneByFormContentId = function (formId) {
  return this.deleteOne({ formId });
};

module.exports = mongoose.model("FormContent", formContentShema);
