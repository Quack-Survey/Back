const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const newFormContent = await formContent.findAll({});
    res.status(200).json(newFormContent);
  } catch (err) {
    console.error("Error creating formContent:", err);
    res.status(500).json({ error: "Failed to create formContent" });
  }
});

module.exports = router;
