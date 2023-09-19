const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId) throw new Error("Have No TemplateId");

    const templateOptionData = await templateOption.findAll(templateId);
    res.status(200).json(templateOptionData);
  } catch (err) {
    console.error("Error getting templateOption:", err);
    res
      .status(500)
      .json({ error: "Failed to get templateOption", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) throw new Error("Have No Body");

    await templateOption.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating templateOption:", err);
    res
      .status(500)
      .json({ error: "Failed to create templateOption", msg: err.message });
  }
});

router.put("/", async (req, res) => {
  const { templateOptionId } = req.query;

  try {
    if (!templateOptionId || !req.body)
      throw new Error("Have No Query || Body");

    await templateOption.updateOneBytemplateOptionId(
      templateOptionId,
      req.body,
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating templateOption:", err);
    res
      .status(500)
      .json({ error: "Failed to update templateOption", msg: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { templateOptionId } = req.query;

  try {
    if (!templateOptionId) throw new Error("Have No TemplateOptionId");

    await templateOption.deleteOneBytemplateOptionId(templateOptionId);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting templateOption:", err);
    res
      .status(500)
      .json({ error: "Failed to delete templateOption", msg: err.message });
  }
});

module.exports = router;
