const router = require("express").Router();

const form = require("../models/form");
const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No formId");

    const formData = await form.findAllByFormId(formId);
    res.status(200).json(formData);
  } catch (err) {
    console.error("Error getting form:", err);
    res.status(500).json({ error: "Failed to get form", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) throw new Error("Have No Body");

    const newForm = await form.create(req.body);
    res.status(201).json(newForm);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form", msg: err.message });
  }
});

router.post("/formContent", async (req, res) => {
  const { formData, formContentData } = req.body;

  try {
    if (!formData || !formContentData)
      throw new Error("Have No FormData || FormContentData");

    const newForm = await form.create(formData);
    await formContent.create({ ...formContentData, formId: newForm._id });
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form", msg: err.message });
  }
});

router.put("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No FormId");

    await form.updateOneByFormId(formId, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ error: "Failed to update form", msg: err.message });
  }
});

router.put("/formContent", async (req, res) => {
  const { formId } = req.query;
  const { formData, formContentData } = req.body;

  try {
    if (!formId || (!formData && !formContentData))
      throw new Error("Have No FormId || (FormData && FormContentData)");

    await form.updateOneByFormId(formId, formData);
    await formContent.updateOneByFormId(formId, formContentData);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ error: "Failed to update form", msg: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No FormId");

    await form.deleteOneByFormId(formId);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ error: "Failed to delete form", msg: err.message });
  }
});

router.delete("/formContent", async (req, res) => {
  const { formId } = req.query;
  console.log(formId);
  try {
    if (!formId) throw new Error("Have No FormId");

    await form.deleteOneByFormId(formId);
    await formContent.deleteOneByFormId(formId);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ error: "Failed to delete form", msg: err.message });
  }
});

module.exports = router;
