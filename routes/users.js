const router = require("express").Router();
const users = require("../models/user");
const { encryptPassword, verifyPassword } = require("../lib/utils/encryptUtil");
const { checkUserData } = require("../lib/middleware/checkUserData");
const { generateToken } = require("../lib/utils/jwtUtil");
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");
const { cookieOptions } = require("../lib/config/cookieConfig");
const { createNickname, getUserData } = require("../lib/utils/usersUtils");

router.get("/", checkAuthorization, async (req, res) => {
  try {
    const data = await users.findAll();

    res.json(data);
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.post("/signup", checkUserData, async (req, res) => {
  const { email, password, username } = req.body;
  const encryptedPassword = await encryptPassword(password);

  try {
    const data = await users.findOneByEmail(email);

    if (data.length) throw new Error("Email already exists.");

    await users.create({
      email,
      username: username || createNickname(),
      ...encryptedPassword,
    });

    res.status(201).json({ state: true, message: "Request Success." });
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.post("/login", checkUserData, async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await getUserData(email, password);

    const { accessToken, refreshToken } = await generateToken(
      {
        email: userData.email,
        username: userData.username,
      },
      false,
    );

    res
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({ state: true, message: "Login success." });
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.get("/logout", async (req, res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(205)
    .json({ state: true, message: "Logout success." });
});

router.patch(
  "/password",
  checkAuthorization,
  checkUserData,
  async (req, res) => {
    const { password, newPassword, userId, hashedPassword, salt } = req.body;

    try {
      const verifyState = await verifyPassword(password, salt, hashedPassword);

      if (!verifyState) throw new Error("Password does not match.");

      const encryptedPassword = await encryptPassword(newPassword);

      await users.updateByUserId(userId, encryptedPassword);

      res.json({ state: true, message: "Password change success." });
    } catch (err) {
      res.status(400).json({ state: false, message: err.message });
    }
  },
);

router.patch("/username", checkAuthorization, async (req, res) => {
  const { username, userId } = req.body;

  try {
    await users.updateByUserId(userId, { username });

    res.json({ state: true, message: "Username change success." });
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.delete("/", checkAuthorization, async (req, res) => {
  const { userId } = req.body;

  try {
    await users.deleteByUserId(userId);

    // userId가 참조된 모든 컬렉션 삭제 로직 추가
    // 가장 마지막에 추가 될 예정

    res.json({ state: true, message: "User Signout success." });
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

module.exports = router;
