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

logicShema.statics.create = function (payload) {
  const logicData = new this(payload);
  return logicData.save();
};

logicShema.statics.findAll = function (payload) {
  return this.find(payload);
};

logicShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

logicShema.static.deleteMany = function (payload) {
  return this.deleteMany(payload);
};

module.exports = mongoose.model("Logic", logicShema);
