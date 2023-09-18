const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const formContentData = await formContent.findAll({
      formId: req.query.formId,
    });
    res.status(200).json(formContentData);
  } catch (err) {
    console.error("Error getting formContent:", err);
    res.status(500).json({ error: "Failed to get formContent" });
  }
});

router.post("/", async (req, res) => {
  try {
    await formContent.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating formContent:", err);
    res.status(500).json({ error: "Failed to create formContent" });
  }
});

router.put("/", async (req, res) => {
  try {
    await formContent.updateOne({ formId: req.query.formId }, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating formContent:", err);
    res.status(500).json({ error: "Failed to update formContent" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await formContent.deleteOne({ formId: req.query.formId });
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting formContent:", err);
    res.status(500).json({ error: "Failed to delete formContent" });
  }
});

module.exports = router;
