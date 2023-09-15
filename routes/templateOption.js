const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  try {
    const templateOptionData = await templateOption.findAll({
      templateId: req.query.templateId,
    });
    res.status(200).json(templateOptionData);
  } catch (err) {
    console.error("Error getting templateOption:", err);
    res.status(500).json({ error: "Failed to get templateOption" });
  }
});

router.post("/", async (req, res) => {
  try {
    await templateOption.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating templateOption:", err);
    res.status(500).json({ error: "Failed to create templateOption" });
  }
});

router.patch("/", async (req, res) => {
  try {
    await templateOption.updateOne(
      { templateId: req.query.templateId },
      req.body,
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating templateOption:", err);
    res.status(500).json({ error: "Failed to update templateOption" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await templateOption.delete(req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting templateOption:", err);
    res.status(500).json({ error: "Failed to delete templateOption" });
  }
});

module.exports = router;
