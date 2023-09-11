const mongoose = require("mongoose");

const Form = mongoose.model("Form");

const templateOptionShema = new mongoose.Schema(
  {
    quater: { type: Array, required: true },
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

templateOptionShema.statics.create = function (payload) {
  const templateOptionData = new this(payload);
  return templateOptionData.save();
};

templateOptionShema.statics.findAll = function (payload) {
  return this.find(payload);
};

templateOptionShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

templateOptionShema.static.deleteMany = function (payload) {
  return this.deleteMany(payload);
};

module.exports = mongoose.model("TemplateOption", templateOptionShema);
