const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/form", require("./form"));
router.use("/formContent", require("./formContent"));
router.use("/template", require("./template"));
router.use("/templateOption", require("./templateOption"));
router.use("/logic", require("./logic"));

router.get("/", (req, res) => {
  res.send("hello this is quacksurvey's api server");
});

module.exports = router;
