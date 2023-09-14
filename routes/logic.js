const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const newLogic = await logic.findAll({
      type: "filter",
      selector: ["1번문항"],
      formId: "6502b54cfc647197a4645d26",
      templateId: "65029a3913cf637226a2b970",
    });
    res.status(201).json(newLogic);
  } catch (err) {
    console.error("Error creating logic:", err);
    res.status(500).json({ error: "Failed to create logic" });
  }
});

module.exports = router;
