const router = require("express").Router();

router.use("/admin", require("./admin"));

router.get("/", (req, res) => {
  res.send("hello this is quacksurvey's api server");
});

module.exports = router;
