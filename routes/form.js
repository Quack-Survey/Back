const router = require("express").Router();

const form = require("../models/form");

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

router.get("/all", async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId) throw new Error("Have No formId");

    const formData = await form.findAllByTemplateId(templateId);
    const sortByOrder = formData.sort((a, b) => a.order - b.order);

    res.status(200).json(sortByOrder);
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

router.put("/order", async (req, res) => {
  try {
    if (!req?.body) throw new Error("Have No body");

    Promise.all(
      req.body?.map(async (formId, i) => {
        await form.updateOneByFormId(formId, { order: i + 1 });
      }),
    );
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

module.exports = router;
