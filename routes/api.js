const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/form", require("./form"));
router.use("/template", require("./template"));
router.use("/templateOption", require("./templateOption"));
router.use("/logic", require("./logic"));
router.use("/complete", require("./complete"));

router.get("/", (req, res) => {
  res.send("hello this is quacksurvey's api server");
});

module.exports = router;
