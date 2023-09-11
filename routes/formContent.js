const router = require("express").Router();

const formContent = require("../models/formContent");

router.get("/", async (req, res) => {
  try {
    const newFormContent = await formContent.create({
      text: "",
      select: ["옵션1", "옵션2", "옵션3", "옵션4"],
      formId: "64fe9fcf2bb64b13a4f2191e",
    });
    res.status(201).json(newFormContent);
  } catch (err) {
    console.error("Error creating formContent:", err);
    res.status(500).json({ error: "Failed to create formContent" });
  }
});

module.exports = router;
