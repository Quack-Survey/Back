const express = require("express");
const router = express.Router();
const checkAuthorization = require("../lib/middleware/checkAuthorization");
const Complete = require("../models/complete");
const Template = require("../models/template");
require("../models/template");

router
  .route("")
  .get(async (req, res) => {
    try {
      const { templateId } = req.query;
      if (templateId) {
        const completes = await Complete.find({ templateId });
        res.json(completes);
      }
      if (!templateId) {
        res.status(400).json({ message: "Write template id" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ state: false, message: "Cannot get all completes" });
    }
  })
  .post(async (req, res) => {
    const { templateId } = req.query;
    try {
      const complete = await Complete.create({
        templateId,
      });
      res.status(201).json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).json({ state: false, message: "Cannot create complete" });
    }
  });

router.route("/user").get(checkAuthorization, async (req, res) => {
  try {
    const { userid } = req.body;
    if (userid) {
      const templatesId = await Template.find({ userId: userid }, "_id");
      const completes = await Promise.all(
        templatesId.map(
          async ({ _id }) =>
            await Complete.find({ templateId: _id }).populate("templateId"),
        ),
      );
      res.json(completes.map((arr) => (arr.length === 0 ? [null] : arr)));
    }
    if (!userid) {
      res.status(400).json({ message: "User id does not exist" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: false, message: "Cannot get user's completes" });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const complete = await Complete.findById(id);
      res.json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).json({ state: false, message: "Cannot get complete" });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { responses } = req.body;
      const complete = await Complete.findByIdAndUpdate(
        id,
        { responses },
        { new: true },
      );
      res.status(201).json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        state: false,
        message: "Cannot update complete. Please check your responses",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const complete = await Complete.findByIdAndDelete(id);
      res.json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).json({ state: false, message: "Cannot delete complete" });
    }
  });

module.exports = router;
