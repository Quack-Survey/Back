const router = require("express").Router();

router.use("/users", require("./users"));

router.get("/", (req, res) => {
  res.send("hello this is quacksurvey's api server");
});

module.exports = router;
