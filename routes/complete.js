const router = require("express").Router();
const complete = require("../models/complete");
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");

router.get("/", checkAuthorization, async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId) throw new Error("Have No templateId");

    const alreadyComplete = await complete.findAllByTemplateId({ templateId });
    res.status(200).json(alreadyComplete);
  } catch (err) {
    console.error("Error getting complete:", err);
    res.status(500).json({ error: "Failed to get complete", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId || !req.body) throw new Error("Have No Body | templateId");

    await complete.create({
      templateId,
      responses: [...req.body],
    });

    res.status(201).json(true);
  } catch (err) {
    console.error("Error creating respondent:", err);
    res
      .status(500)
      .json({ error: "Failed to create respondent", msg: err.message });
  }
});

module.exports = router;
