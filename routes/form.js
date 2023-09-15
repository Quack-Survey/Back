const router = require("express").Router();

const form = require("../models/form");

router.get("/", async (req, res) => {
  try {
    const newForm = await form.findAll({});
    res.status(201).json(newForm);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

router.put("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

module.exports = router;
