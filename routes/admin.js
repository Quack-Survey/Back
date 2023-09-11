const router = require("express").Router();
const admin = require("../models/admin");

router.get("/", async (req, res) => {
  try {
    const newAdmin = await admin.create({
      username: "Hun5LEE",
      email: "test@test.com",
      password: "testpassword",
    });
    res.status(201).json(newAdmin);
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

module.exports = router;
