const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No formId");

    const formContentData = await formContent.findAllByFormId(formId);
    res.status(200).json(formContentData);
  } catch (err) {
    console.error("Error getting formContent:", err);
    res
      .status(500)
      .json({ error: "Failed to get formContent", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) throw new Error("Have No Body");

    await formContent.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating formContent:", err);
    res
      .status(500)
      .json({ error: "Failed to create formContent", msg: err.message });
  }
});

router.put("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId || !req.body) throw new Error("Have No Query || Body");

    await formContent.updateOneByFormId(formId, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating formContent:", err);
    res
      .status(500)
      .json({ error: "Failed to update formContent", msg: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No formId");

    await formContent.deleteOneByFormId(formId);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting formContent:", err);
    res
      .status(500)
      .json({ error: "Failed to delete formContent", msg: err.message });
  }
});

module.exports = router;
