const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const completeSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types,
      required: true,
      ref: "Template",
    },
    state: {
      type: Number,
      enum: [0, 1],
      required: true,
      default: 0,
    },
    responses: [
      {
        formId: { type: mongoose.Schema.Types, required: true, ref: "Form" },
        response: [String],
      },
    ],
  },
  { timestamps: true },
);

completeSchema.statics.create = function (data) {
  const completeData = new this(data);

  return completeData.save();
};

completeSchema.statics.findAllWithOptions = function (options) {
  return this.find(options).populate({
    path: "responses",
    populate: {
      path: "formId",
      select: "title description",
    },
  });
};

completeSchema.statics.findOneById = function (id) {
  return this.findById(id);
};

completeSchema.statics.updateById = function (id, data) {
  return this.findByIdAndUpdate(id, { state: 1, ...data }, { new: true });
};

completeSchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

module.exports = mongoose.model("Complete", completeSchema);
