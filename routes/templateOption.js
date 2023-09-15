const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  try {
    const newTemplateOption = await templateOption.findAll({});
    res.status(201).json(newTemplateOption);
  } catch (err) {
    console.error("Error creating templateOption:", err);
    res.status(500).json({ error: "Failed to create templateOption" });
  }
});

module.exports = router;
