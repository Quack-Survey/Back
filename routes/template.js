const router = require("express").Router();

const template = require("../models/template");
const form = require("../models/form");
const formContent = require("../models/formContent");
const templateOption = require("../models/templateOption");
const logic = require("../models/logic");

router.get("/", async (req, res) => {
  try {
    const templateData = await template.findAll({
      userId: req.query.userId,
    });

    res.status(200).json(templateData);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template" });
  }
});

router.get("/properties", async (req, res) => {
  try {
    const formData = await form.findAll({
      templateId: req.query.templateId,
    });

    const formContentData = await formContent.findAll({
      templateId: req.query.templateId,
    });

    const templateOptionData = await templateOption.findAll({
      templateId: req.query.templateId,
    });

    const logicData = await logic.findAll({
      templateId: req.query.templateId,
    });

    res.status(200).json({
      form: formData,
      formContent: formContentData,
      templateOption: templateOptionData,
      logic: logicData,
    });
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTemplate = await template.create(req.body);
    res.status(201).json(newTemplate);
  } catch (err) {
    console.error("Error creating template:", err);
    res.status(500).json({ error: "Failed to create template" });
  }
});

router.put("/properties", async (req, res) => {
  try {
    await template.updateOne({ _id: req.body.template._id }, req.body.template);

    if (req.body.forms) {
      await Promise.all(
        req.body.forms.map(async (formData) => {
          await form.updateOne({ _id: formData._id }, formData);
        }),
      );
    }

    if (req.body.formContents) {
      await Promise.all(
        req.body.formContents.map(async (formContentData) => {
          await formContent.updateOne(
            { _id: formContentData._id },
            formContentData,
          );
        }),
      );
    }

    if (req.body.templateOption) {
      await templateOption.updateOne(
        { templateId: req.body.template._id },
        req.body.templateOption,
      );
    }

    if (req.body.logics) {
      await Promise.all(
        req.body.logics.map(async (logicData) => {
          await logic.updateOne({ _id: logicData._id }, logicData);
        }),
      );
    }

    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating template:", err);
    res.status(500).json({ error: "Failed to update template" });
  }
});

router.delete("/properties", async (req, res) => {
  try {
    await Promise.all(
      req.body.map(async (templateId) => {
        await template.deleteOne({ _id: templateId });
        await form.deleteMany({ templateId: templateId });
        await formContent.deleteMany({ templateId: templateId });
        await templateOption.deleteOne({ templateId: templateId });
        await logic.deleteMany({ templateId: templateId });
      }),
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting template:", err);
    res.status(500).json({ error: "Failed to delete template" });
  }
});

module.exports = router;
