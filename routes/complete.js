const express = require("express");
const router = express.Router();
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");
const Complete = require("../models/complete");
const Template = require("../models/template");
const { mongo } = require("mongoose");
require("../models/template");

router
  .route("")
  .get(checkAuthorization, async (req, res) => {
    try {
      const { templateId } = req.query;
      const { userId } = req.body;
      if (templateId) {
        const template = await Template.findById(templateId);
        const targetUserId = template.userId + "";
        if (targetUserId !== userId + "") {
          throw new Error("userId doesn't match");
        }
        const id = new mongo.ObjectID(templateId);
        const completes = await Complete.findAllWithOptions({ templateId: id });
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
    const { userId } = req.body;
    if (userId) {
      const bookmarkedTemplates = await Template.find({
        userId: userId,
        bookMark: true,
      });
      const completes = await Promise.all(
        bookmarkedTemplates.map(async ({ _id }) => {
          return await Complete.findAllWithOptions({
            templateId: _id,
          });
        }),
      );
      res.json(completes.map((arr) => (arr.length === 0 ? [null] : arr)));
    }
    if (!userId) {
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
      const complete = await Complete.findOneById(id);
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
      const updatedComplete = await Complete.updateById(id, { responses });
      res.status(201).json(updatedComplete);
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
      const deletedComplete = await Complete.deleteById(id);
      res.json(deletedComplete);
    } catch (err) {
      console.error(err);
      res.status(500).json({ state: false, message: "Cannot delete complete" });
    }
  });

module.exports = router;
