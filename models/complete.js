const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const completeSchema = new Schema(
  {
    templateId: {
      type: ObjectId,
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
        formId: { type: ObjectId, required: true, ref: "Form" },
        response: [String],
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Complete", completeSchema);
