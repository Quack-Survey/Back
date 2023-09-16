const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const { Schema } = mongoose;
// prettier-ignore
const { Types: { ObjectId } } = Schema;

const completeSchema = new Schema(
  {
    // template 스키마의 Id를 참조해야함
    templateId: {
      type: ObjectId,
      required: true,
      ref: "Template",
    },
    state: {
      type: Number,
      enum: [0, 1], // 0:미완 => 템플릿접근시 바로, 1:완 => 설문제출시
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

// 몽구스가 내부적으로 Complete => complete => completes로 컬렉션을 생성 이게 싫으면 세번째인수로 컬렉션이름 줄 수 있음
module.exports = mongoose.model("Complete", completeSchema);
