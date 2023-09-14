const router = require("express").Router();

const template = require("../models/template");
// const form = require("../models/form");
// const formContent = require("../models/formContent");
// const templateOption = require("../models/templateOption");
// const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    // 쿼리값이 넘어와야함.
    const templateData = await template.findAll({
      userId: req.query.userId,
    });

    res.status(200).json(templateData);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template" });
  }
});

router.post("/", async (req, res) => {
  try {
    await template.create(req.body);
    res.status(201);
  } catch (err) {
    console.error("Error creating template:", err);
    res.status(500).json({ error: "Failed to create template" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Promise.all(
      req.body.map(async (templateId) => {
        await template.deleteOne({ _id: templateId });
      }),
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error creating template:", err);
    res.status(500).json({ error: "Failed to create template" });
  }
});

module.exports = router;
