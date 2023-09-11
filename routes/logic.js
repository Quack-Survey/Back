const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const newLogic = await logic.create({
      type: "filter",
      selector: ["1번문항"],
      formId: "64fe9fcf2bb64b13a4f2191e",
    });
    res.status(201).json(newLogic);
  } catch (err) {
    console.error("Error creating logic:", err);
    res.status(500).json({ error: "Failed to create logic" });
  }
});

module.exports = router;
