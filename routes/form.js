const router = require("express").Router();

const form = require("../models/form");

router.get("/", async (req, res) => {
  try {
    const newForm = await form.fidAll({
      title: "test2 Form",
      type: "text",
      option: ["옵션1", "옵션2", "옵션3", "옵션4"],
      order: 2,
      bookMark: true,
      templateId: "64fc5ce18de6354509f7104e",
    });
    res.status(201).json(newForm);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

module.exports = router;
