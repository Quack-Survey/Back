const router = require("express").Router();

const form = require("../models/form");

router.get("/", async (req, res) => {
  try {
    const formData = await form.findAll({});
    res.status(200).json(formData);
  } catch (err) {
    console.error("Error getting form:", err);
    res.status(500).json({ error: "Failed to get form" });
  }
});

module.exports = router;
