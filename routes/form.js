const router = require("express").Router();

const form = require("../models/form");
const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const formData = await form.findAll({ _id: req.query.formId });
    res.status(200).json(formData);
  } catch (err) {
    console.error("Error getting form:", err);
    res.status(500).json({ error: "Failed to get form" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newForm = await form.create(req.body);
    res.status(201).json(newForm);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

router.post("/formContent", async (req, res) => {
  try {
    const newForm = await form.create(req.body.form);
    await formContent.create({ ...req.body.formContent, formId: newForm._id });
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

router.put("/", async (req, res) => {
  try {
    await form.updateOne({ _id: req.query.formId }, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ error: "Failed to update form" });
  }
});

router.put("/formContent", async (req, res) => {
  try {
    const mutationForm = await form.updateOne(
      { _id: req.query.formId },
      req.body.form,
    );
    await formContent.updateOne(
      { formId: mutationForm._id },
      req.body.formContent,
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ error: "Failed to update form" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await form.deleteOne({ _id: req.query.formId });
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ error: "Failed to delete form" });
  }
});

router.delete("/formContent", async (req, res) => {
  try {
    await form.deleteOne({ _id: req.query.formId });
    await formContent.deleteOne({ formId: req.query.formId });
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ error: "Failed to delete form" });
  }
});

module.exports = router;
