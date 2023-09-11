const mongoose = require("mongoose");

const Template = mongoose.model("Template");

const formShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    option: { type: Array, required: true },
    order: { type: Number, required: true },
    plural: { type: Boolean, default: false },
    bookMark: { type: Boolean, default: false },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Template,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

formShema.statics.create = function (payload) {
  const templateData = new this(payload);
  return templateData.save();
};

formShema.statics.findAll = function (payload) {
  return this.find(payload);
};

formShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

formShema.static.deleteMany = function (payload) {
  return this.deleteMany(payload);
};

module.exports = mongoose.model("Form", formShema);
