const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "user" });
});

module.exports = router;