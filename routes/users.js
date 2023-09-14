const router = require("express").Router();
const users = require("../models/user");
const { encryptPassword, verifyPassword } = require("../lib/utils/encryptUtil");
const { checkEmail } = require("../lib/middleware/checkEmail");
const { generateToken } = require("../lib/utils/jwtUtil");

const cookieOptions = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

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
    res.status(500).json({ state: false, message: "unknown error." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.cookies);

  try {
    const targetData = (await users.findOne(email))[0];
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
  console.log(req.cookies);
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(205)
    .json({ state: true, message: "Logout success." });
});

module.exports = router;
