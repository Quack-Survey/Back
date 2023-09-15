const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const newLogic = await logic.findAll({});
    res.status(201).json(newLogic);
  } catch (err) {
    console.error("Error creating logic:", err);
    res.status(500).json({ error: "Failed to create logic" });
  }
});

module.exports = router;
