const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  try {
    const newTemplateOption = await templateOption.findAll({
      quater: ["옵션1"],
      formId: "6502b54cfc647197a4645d26",
      templateId: "65029a3913cf637226a2b970",
    });
    res.status(201).json(newTemplateOption);
  } catch (err) {
    console.error("Error creating templateOption:", err);
    res.status(500).json({ error: "Failed to create templateOption" });
  }
});

module.exports = router;
