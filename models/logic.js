const mongoose = require("mongoose");

const logicShema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    selector: { type: Array, required: true },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    appliedFormId: {
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
    versionKey: false,
    timestamps: true,
  },
);

logicShema.statics.create = function (payload) {
  const logicData = new this(payload);
  return logicData.save();
};

logicShema.statics.findAllByTemplateId = function (templateId) {
  return this.find({ templateId });
};

logicShema.statics.findOneByFormId = function (formId) {
  return this.findOne({ formId });
};

logicShema.statics.updateOneByLogicId = function (logicId, updateInfo) {
  return this.updateOne(
    { _id: logicId },
    { ...updateInfo, updatedAt: new Date() },
  );
};

logicShema.statics.deleteManyByTemplateId = function (templateId) {
  return this.deleteMany({ templateId });
};

logicShema.statics.deleteOneByLogicId = function (logicId) {
  return this.deleteOne({ _id: logicId });
};

module.exports = mongoose.model("Logic", logicShema);
