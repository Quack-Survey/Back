const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const formContentData = await formContent.findAll({});
    res.status(200).json(formContentData);
  } catch (err) {
    console.error("Error getting formContent:", err);
    res.status(500).json({ error: "Failed to get formContent" });
  }
});

module.exports = router;
