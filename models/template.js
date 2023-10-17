const mongoose = require("mongoose");

const templateShema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String, required: false },
    targetNumber: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookMark: { type: Boolean, default: false },
    deadLine: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

templateShema.statics.create = function (payload) {
  const templateData = new this(payload);
  return templateData.save();
};

templateShema.statics.findAllByUserId = function (userId) {
  return this.find({ userId });
};

templateShema.statics.findAllByTemplateId = function (templateId) {
  return this.find({ _id: templateId });
};

templateShema.statics.findByTemplateId = function (templateId) {
  return this.findById({ _id: templateId });
};

templateShema.statics.updateOneByTemplateId = function (
  templateId,
  updateInfo,
) {
  return this.updateOne(
    { _id: templateId },
    { ...updateInfo, updatedAt: new Date() },
  );
};

templateShema.statics.deleteOneByTemplateId = function (templateId) {
  return this.deleteOne({ _id: templateId });
};

module.exports = mongoose.model("Template", templateShema);
