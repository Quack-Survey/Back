const router = require("express").Router();

const templateOption = require("../models/templateOption");

router.get("/", async (req, res) => {
  try {
    const templateOptionData = await templateOption.findAll({});
    res.status(200).json(templateOptionData);
  } catch (err) {
    console.error("Error getting templateOption:", err);
    res.status(500).json({ error: "Failed to get templateOption" });
  }
});

module.exports = router;
