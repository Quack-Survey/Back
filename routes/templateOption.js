const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  try {
    const newTemplateOption = await templateOption.create({
      quater: ["옵션1"],
      formId: "64fe9fcf2bb64b13a4f2191e",
    });
    res.status(201).json(newTemplateOption);
  } catch (err) {
    console.error("Error creating templateOption:", err);
    res.status(500).json({ error: "Failed to create templateOption" });
  }
});

module.exports = router;
