const router = require("express").Router();
const users = require("../models/user");
const { encryptPassword, verifyPassword } = require("../lib/utils/encryptUtil");
const { checkEmail } = require("../lib/middleware/checkEmail");
const { generateToken } = require("../lib/utils/jwtUtil");
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");
const { cookieOptions } = require("../lib/config/cookieConfig");

router.get("/", checkAuthorization, async (req, res) => {
  try {
    const data = await users.findAll();

    res.json(data);
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.post("/signup", checkEmail, async (req, res) => {
  const { email, password, username } = req.body;
  const { hashedPassword, salt } = await encryptPassword(password);

  try {
    await users.create({
      email,
      hashedPassword,
      salt,
      username,
    });

    res.status(201).json({ state: true, message: "Request Success." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ state: false, message: "unknown error." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const targetData = (await users.findOneByEmail(email))[0];
    const verifyState = await verifyPassword(
      password,
      targetData.salt,
      targetData.hashedPassword,
    );

    if (verifyState) {
      const payload = {
        email: targetData.email,
        username: targetData.username,
      };

      const { accessToken, refreshToken } = await generateToken(payload, false);

      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({ state: true, message: "Login success." });
    } else {
      res
        .status(500)
        .json({ state: false, message: "Password does not match." });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: "Email does not match." });
  }
});

router.get("/logout", async (req, res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(205)
    .json({ state: true, message: "Logout success." });
});

router.patch("/password", checkAuthorization, async (req, res) => {
  const { password, newPassword, userid } = req.body;

  try {
    const targetData = (await users.findOneByUserid(userid))[0];
    const verifyState = await verifyPassword(
      password,
      targetData.salt,
      targetData.hashedPassword,
    );

    if (verifyState) {
      const { hashedPassword, salt } = await encryptPassword(newPassword);
      await users.updateByUserid(userid, { hashedPassword, salt });

      res.json({ state: true, message: "Password change success." });
    } else {
      res
        .status(500)
        .json({ state: false, message: "Password does not match." });
    }
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.patch("/username", checkAuthorization, async (req, res) => {
  const { username, userid } = req.body;

  try {
    await users.updateByUserid(userid, { username });

    res.json({ state: true, message: "Username change success." });
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.delete("/", checkAuthorization, async (req, res) => {
  const { userid } = req.body;

  try {
    await users.deleteByUserid(userid);

    // userid가 참조된 모든 컬렉션 삭제 로직 추가
    // 가장 마지막에 추가 될 예정

    res.json({ state: true, message: "User Signout success." });
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

module.exports = router;
