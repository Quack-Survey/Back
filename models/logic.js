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

logicShema.statics.create = function (logicInfo) {
  const logicData = new this(logicInfo);
  return logicData.save();
};

logicShema.statics.findAll = function (templateId) {
  return this.find({ templateId });
};

logicShema.statics.updateOneByLogicId = function (logicId, updateInfo) {
  return this.updateOne({ _id: logicId }, updateInfo);
};

logicShema.statics.deleteManyByLogicId = function (payload) {
  return this.deleteMany(payload);
};

logicShema.statics.deleteOneByLogicId = function (logicId) {
  return this.deleteOne({ _id: logicId });
};

module.exports = mongoose.model("Logic", logicShema);
