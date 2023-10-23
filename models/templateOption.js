const mongoose = require("mongoose");

const templateOptionShema = new mongoose.Schema(
  {
    quater: { type: Array, required: true },
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
  { versionKey: false, timestamps: true },
);

templateOptionShema.statics.create = function (payload) {
  const templateOptionData = new this(payload);
  return templateOptionData.save();
};

templateOptionShema.statics.findAllByTemplateId = function (templateId) {
  return this.find({ templateId });
};

templateOptionShema.statics.updateOneBytemplateOptionId = function (
  templateOptionId,
  updateInfo,
) {
  return this.updateOne(
    { _id: templateOptionId },
    { ...updateInfo, updatedAt: new Date() },
  );
};

templateOptionShema.statics.updateOneBytemplateId = function (
  templateId,
  updateInfo,
) {
  return this.updateOne(
    { templateId },
    { ...updateInfo, updatedAt: new Date() },
  );
};

templateOptionShema.statics.deleteOneBytemplateOptionId = function (
  templateOptionId,
) {
  return this.deleteOne({ _id: templateOptionId });
};

templateOptionShema.statics.deleteOneBytemplateId = function (templateId) {
  return this.deleteOne({ templateId });
};

module.exports = mongoose.model("TemplateOption", templateOptionShema);
