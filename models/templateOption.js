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
  {
    timestamps: true,
  },
);

templateOptionShema.statics.create = function (payload) {
  const templateOptionData = new this(payload);
  return templateOptionData.save();
};

templateOptionShema.statics.findAll = function (templateId) {
  return this.find({ templateId });
};

templateOptionShema.statics.updateOneBytemplateOptionId = function (
  templateOptionId,
  updateInfo,
) {
  return this.updateOne({ _id: templateOptionId }, updateInfo);
};

templateOptionShema.statics.deleteOneBytemplateOptionId = function (
  templateOptionId,
) {
  return this.deleteOne({ _id: templateOptionId });
};

module.exports = mongoose.model("TemplateOption", templateOptionShema);
