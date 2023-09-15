const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const logicData = await logic.findAll({});
    res.status(200).json(logicData);
  } catch (err) {
    console.error("Error getting logic:", err);
    res.status(500).json({ error: "Failed to get logic" });
  }
});

module.exports = router;
