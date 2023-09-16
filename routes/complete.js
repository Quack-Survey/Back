const express = require("express");
const router = express.Router();
const Complete = require("../models/complete");
const Template = require("../models/template");
require("../models/template");

router
  .route("")
  .get(async (req, res) => {
    // "complete/?userId=ObjectId"
    // "complete/?templateId=ObjectId"
    try {
      const { userId, templateId } = req.query;
      // 특정 유저의 모든 응답데이터 조회
      if (userId) {
        // const completes = {};
        const templatesId = await Template.find({ userId }, "_id");
        // console.log(templatesId);
        // [
        //   { _id: 64fc5a9458a018020854ff2b },
        //   { _id: 6503d7e7871261b5bb71e12a },
        //   { _id: 6503d7ed871261b5bb71e12b }
        // ]
        const completes = await Promise.all(
          templatesId.map(
            async ({ _id }) =>
              await Complete.find({ templateId: _id }).populate("templateId"),
          ),
        );
        res.json(completes.map((arr) => (arr.length === 0 ? [null] : arr)));
      }
      // 특정 설문조사의 모든 응답 데이터 조회
      if (templateId) {
        const completes = await Complete.find({ templateId });
        res.json(completes);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const { templateId } = req.query;
    // 응답자가 설문 진입 시, 미완상태로 데이터 밀어넣기
    try {
      const complete = await Complete.create({
        templateId,
      });
      res.status(201).json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
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
      res.status(500).send(err);
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
      res.status(500).send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const complete = await Complete.findByIdAndDelete(id);
      res.json(complete);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

module.exports = router;
