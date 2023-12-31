const mongoose = require("mongoose");

const completeSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types,
      required: true,
      ref: "Template",
    },
    responses: [
      {
        _id: false,
        type: { type: String, required: true },
        question: { type: Array, default: [""] },
        order: { type: Number, required: true },
        title: { type: String },
        response: [String],
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

completeSchema.statics.create = function (data) {
  const completeData = new this(data);

  return completeData.save();
};

completeSchema.statics.findAllByTemplateId = function ({ templateId }) {
  return this.find({ templateId });
};

completeSchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

completeSchema.statics.deleteManyByTemplateId = function (templateId) {
  return this.deleteMany({ templateId });
};

module.exports = mongoose.model("Complete", completeSchema);
