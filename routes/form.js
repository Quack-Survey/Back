const router = require("express").Router();

const form = require("../models/form");

router.get("/", async (req, res) => {
  try {
    const newForm = await form.findAll({
      title: "테스트 폼",
      type: "text",
      order: 1,
      templateId: "65029a6e13cf637226a2b976",
    });
    res.status(201).json(newForm);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

router.put("/", async (req, res) => {
  try {
    // console.log(req.body);
    // await Promise.all(
    //   req.body.map(async (a, i) => {
    //     await form.updateOne({ _id: a._id }, a);
    //   }),
    // );

    res.send("hello");
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
});

module.exports = router;
