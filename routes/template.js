const router = require("express").Router();

const template = require("../models/template");

router.get("/", async (req, res) => {
  try {
    const newTemplate = await template.findAll({
      userId: "64fc5b9533f93b41fb38e08c",
    });
    res.status(201).json(newTemplate);
  } catch (err) {
    console.error("Error creating template:", err);
    res.status(500).json({ error: "Failed to create template" });
  }
});

module.exports = router;
