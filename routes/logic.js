const router = require("express").Router();

const logic = require("../models/logic");

router.get("/", async (req, res) => {
  const { formId } = req.query;

  try {
    if (!formId) throw new Error("Have No FormId");

    const logicData = await logic.findOneByFormId(formId);
    res.status(200).json(logicData);
  } catch (err) {
    console.error("Error getting logic:", err);
    res.status(500).json({ error: "Failed to get logic", msg: err.message });
  }
});

router.get("/all", async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId) throw new Error("Have No TemplateId");

    const logicData = await logic.findAllByTemplateId(templateId);
    res.status(200).json(logicData);
  } catch (err) {
    console.error("Error getting logic:", err);
    res.status(500).json({ error: "Failed to get logic", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body || !req.body.selector.length === 0)
      throw new Error("Have No Body");

    await logic.create(req.body);
    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating logic:", err);
    res.status(500).json({ error: "Failed to create logic", msg: err.message });
  }
});

router.put("/", async (req, res) => {
  const { logicId } = req.query;
  try {
    if (!logicId || !req.body) throw new Error("Have No Query || Body");

    await logic.updateOneByLogicId(logicId, req.body);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating logic:", err);
    res.status(500).json({ error: "Failed to update logic", msg: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { logicId } = req.query;

  try {
    if (!logicId) throw new Error("Have No LogicId");

    await logic.deleteOneByLogicId(logicId);
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting logic:", err);
    res.status(500).json({ error: "Failed to delete logic", msg: err.message });
  }
});

module.exports = router;
