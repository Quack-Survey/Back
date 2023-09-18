const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const logicData = await logic.findAll({ templateId: req.query.templateId });
    res.status(200).json(logicData);
  } catch (err) {
    console.error("Error getting logic:", err);
    res.status(500).json({ error: "Failed to get logic" });
  }
});

router.post("/", async (req, res) => {
  try {
    await logic.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating logic:", err);
    res.status(500).json({ error: "Failed to create logic" });
  }
});

router.put("/", async (req, res) => {
  try {
    await logic.updateOne({ _id: req.query.logicId }, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating logic:", err);
    res.status(500).json({ error: "Failed to update logic" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await logic.deleteOne({ _id: req.query.logicId });
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting logic:", err);
    res.status(500).json({ error: "Failed to delete logic" });
  }
});

module.exports = router;
