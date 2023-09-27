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

formContentShema.statics.findAllByFormId = function (formId) {
  return this.find({ formId });
};

formContentShema.statics.findAllByTemplateId = function (templateId) {
  return this.find({ templateId });
};

formContentShema.statics.updateOneByFormId = function (formId, updateInfo) {
  return this.updateOne({ formId }, { ...updateInfo, updatedAt: new Date() });
};

formContentShema.statics.deleteManyByTemplateId = function (templateId) {
  return this.deleteMany({ templateId });
};

formContentShema.statics.deleteOneByFormId = function (formId) {
  return this.deleteOne({ formId });
};

module.exports = mongoose.model("FormContent", formContentShema);
