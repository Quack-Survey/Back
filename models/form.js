const mongoose = require("mongoose");

const formShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, required: true },
    plural: { type: Boolean, default: false },
    bookMark: { type: Boolean, default: false },
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

formShema.statics.create = function (payload) {
  const formData = new this(payload);
  return formData.save();
};

formShema.statics.findAll = function (payload) {
  return this.find(payload);
};

formShema.static.updateOne = function (payload) {
  return this.updateOne(payload);
};

formShema.static.updateMany = function (payload) {
  return this.updateMany(payload);
};

formShema.static.deleteMany = function (payload) {
  return this.deleteMany(payload);
};

formShema.static.deleteOne = function (payload) {
  return this.deleteOne(payload);
};

module.exports = mongoose.model("Form", formShema);
