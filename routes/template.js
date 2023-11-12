const router = require("express").Router();

const template = require("../models/template");
const form = require("../models/form");
const templateOption = require("../models/templateOption");
const logic = require("../models/logic");
const complete = require("../models/complete");
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");

router.get("/", checkAuthorization, async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) throw new Error("Have No UserId");
    const templateData = await template.findAllByUserId(userId);
    const payload = templateData.map((templateInfo) => {
      return {
        _id: templateInfo._id,
        title: templateInfo.title,
        description: templateInfo.description,
        targetNumber: templateInfo.targetNumber,
        bookMark: templateInfo.bookMark,
        deadline: templateInfo.deadline,
        updatedAt: templateInfo.updatedAt,
        createdAt: templateInfo.createdAt,
      };
    });
    res.status(200).json(payload);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template", msg: err.message });
  }
});

router.get("/one", checkAuthorization, async (req, res) => {
  const { userId } = req.body;
  const { templateId } = req.query;

  try {
    if (!userId || !templateId)
      throw new Error("Have No UserId || templatedId");
    const templateData = await template.findByTemplateId(templateId);
    const payload = {
      _id: templateData._id,
      title: templateData.title,
      description: templateData.description,
      targetNumber: templateData.targetNumber,
      bookMark: templateData.bookMark,
      deadline: templateData.deadline,
      updatedAt: templateData.updatedAt,
      createdAt: templateData.createdAt,
    };
    res.status(200).json(payload);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template", msg: err.message });
  }
});

router.get("/properties", checkAuthorization, async (req, res) => {
  const { templateId } = req.query;
  const { userId } = req.body;

  try {
    if (!templateId || !userId) throw new Error("Have No TemplateId || UserId");

    const templateData = await template.findByTemplateId(templateId);

    const formData = await form.findAllByTemplateId(templateId);
    const sortByOrder = formData.sort((a, b) => a.order - b.order);

    const templateOptionData =
      await templateOption.findAllByTemplateId(templateId);

    const logicData = await logic.findAllByTemplateId(templateId);

    const payload = {
      template: {
        _id: templateData._id,
        title: templateData.title,
        description: templateData.description,
        targetNumber: templateData.targetNumber,
        bookMark: templateData.bookMark,
        deadline: templateData.deadline,
        updatedAt: templateData.updatedAt,
        createdAt: templateData.createdAt,
      },
      form: sortByOrder,
      templateOption: templateOptionData,
      logic: logicData,
    };

    res.status(200).json(payload);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template", msg: err.message });
  }
});

router.get("/respondent", async (req, res) => {
  const { templateId } = req.query;

  try {
    if (!templateId) throw new Error("Have No TemplateId ");

    const templateData = await template.findAllByTemplateId(templateId);

    const formData = await form.findAllByTemplateId(templateId);
    const sortByOrder = formData.sort((a, b) => a.order - b.order);

    const templateOptionData =
      await templateOption.findAllByTemplateId(templateId);

    const logicData = await logic.findAllByTemplateId(templateId);

    const payload = {
      template: {
        _id: templateData[0]._id,
        title: templateData[0].title,
        description: templateData[0].description,
        targetNumber: templateData[0].targetNumber,
        bookMark: templateData[0].bookMark,
        deadline: templateData[0].deadline,
        updatedAt: templateData[0].updatedAt,
        createdAt: templateData[0].createdAt,
      },
      form: sortByOrder,
      templateOption: templateOptionData,
      logic: logicData,
    };

    res.status(200).json(payload);
  } catch (err) {
    console.error("Error getting template:", err);
    res.status(500).json({ error: "Failed to get template", msg: err.message });
  }
});

router.post("/", checkAuthorization, async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) throw new Error("Have No UserId");

    const newTemplate = await template.create(req.body);
    res.status(201).json(newTemplate);
  } catch (err) {
    console.error("Error creating template:", err);
    res
      .status(500)
      .json({ error: "Failed to create template", msg: err.message });
  }
});

router.put("/properties", checkAuthorization, async (req, res) => {
  const { templateInfo, formsInfo, templateOptionInfo, logicsInfo, userId } =
    req.body;

  try {
    if (!userId) throw new Error("Have No UserId");
    await template.updateOneByTemplateId(templateInfo._id, templateInfo);

    if (formsInfo) {
      await Promise.all(
        formsInfo.map(async (formData) => {
          await form.updateOneByFormId(formData._id, formData);
        }),
      );
    }

    if (templateOptionInfo) {
      await templateOption.updateOneBytemplateId(
        templateInfo._id,
        templateOptionInfo,
      );
    }

    if (logicsInfo) {
      await Promise.all(
        logicsInfo.map(async (logicData) => {
          await logic.updateOneByLogicId(logicData._id, logicData);
        }),
      );
    }

    res.status(200).json(true);
  } catch (err) {
    console.error("Error updating template:", err);
    res
      .status(500)
      .json({ error: "Failed to update template", msg: err.message });
  }
});

router.put("/", checkAuthorization, async (req, res) => {
  const { templateId } = req.query;
  const { userId } = req.body;

  try {
    if (!userId && templateId) throw new Error("Have No UserId");
    const mutateTemplate = await template.updateOneByTemplateId(
      templateId,
      req.body,
    );
    res.status(200).json(mutateTemplate);
  } catch (err) {
    console.error("Error updating template:", err);
    res
      .status(500)
      .json({ error: "Failed to update template", msg: err.message });
  }
});

router.delete("/properties", checkAuthorization, async (req, res) => {
  const { templateIds, userId } = req.body;
  // 추후 complete 삭제기능 추가예정
  console.log(templateIds, userId);
  try {
    if (!templateIds || !userId)
      throw new Error("Have No TemplatesId || UserId");

    await Promise.all(
      templateIds.map(async (templateId) => {
        await template.deleteOneByTemplateId(templateId);
        await form.deleteManyByTemplateId(templateId);
        await templateOption.deleteOneBytemplateId(templateId);
        await logic.deleteManyByTemplateId(templateId);
        await complete.deleteManyByTemplateId(templateId);
      }),
    );
    res.status(200).json(true);
  } catch (err) {
    console.error("Error deleting template:", err);
    res
      .status(500)
      .json({ error: "Failed to delete template", msg: err.message });
  }
});

module.exports = router;
