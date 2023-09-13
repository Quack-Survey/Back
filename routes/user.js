const router = require("express").Router();
const user = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const newUser = await user.create({
      username: "Hun5LEE",
      email: "test@test.com",
      password: "testpassword",
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
