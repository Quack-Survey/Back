const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const newFormContent = await formContent.findAll({
      text: "테스트 텍스트입니다.",
      select: [""],
      templateId: "65029a6e13cf637226a2b976",
      formId: "6502b54cfc647197a4645d26",
    });
    res.status(200).json(newFormContent);
  } catch (err) {
    console.error("Error creating formContent:", err);
    res.status(500).json({ error: "Failed to create formContent" });
  }
});

module.exports = router;
