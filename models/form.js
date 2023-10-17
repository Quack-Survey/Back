const mongoose = require("mongoose");

const formShema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      validate: {
        validator: function (title) {
          return title !== undefined && title !== null;
        },
        message: "Title cannot be undefined or null",
      },
    },
    type: { type: String, required: true },
    select: { type: Array, required: true },
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

formShema.statics.findAllByFormId = function (formId) {
  return this.find({ _id: formId });
};

formShema.statics.findAllByTemplateId = function (templateId) {
  return this.find({ templateId });
};

formShema.statics.updateOneByFormId = function (formId, updateInfo) {
  return this.updateOne(
    { _id: formId },
    { ...updateInfo, updatedAt: new Date() },
  );
};

formShema.statics.deleteManyByTemplateId = function (templateId) {
  return this.deleteMany({ templateId });
};

formShema.statics.deleteOneByFormId = function (formId) {
  return this.deleteOne({ _id: formId });
};

module.exports = mongoose.model("Form", formShema);
