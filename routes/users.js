const router = require("express").Router();
const users = require("../models/user");
const userTemps = require("../models/userTemp");
const expireAuths = require("../models/expireAuth");
const { encryptPassword, verifyPassword } = require("../lib/utils/encryptUtil");
const { checkUserData } = require("../lib/middleware/checkUserData");
const { generateToken } = require("../lib/utils/jwtUtil");
const { checkAuthorization } = require("../lib/middleware/checkAuthorization");
const { cookieOptions } = require("../lib/config/cookieConfig");
const {
  createNickname,
  getUserData,
  generateVerifyCode,
} = require("../lib/utils/usersUtils");
const { sendJoinMail, sendFindMail } = require("../lib/utils/emailUtils");

router.get("/tempusers", async (req, res) => {
  const userData = await userTemps.findAll();

  res.send(userData);
});

router.get("/expireauth", async (req, res) => {
  const expireAuthData = await expireAuths.findAll();

  res.send(expireAuthData);
});

router.get("/", checkAuthorization, async (req, res) => {
  const { userId } = req.body;

  try {
    const userData = (await users.findOneByUserId(userId))[0];
    const payload = {
      state: true,
      data: {
        cert: userData.cert,
        email: userData.email,
        username: userData.username,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    };

    res.json(payload);
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.get("/all", checkAuthorization, async (req, res) => {
  try {
    const userData = (await users.findAll()).map((data) => {
      return {
        cert: data.cert,
        email: data.email,
        username: data.username,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });

    const payload = {
      state: true,
      data: userData,
    };

    res.json(payload);
  } catch (err) {
    res.status(403).json({ state: false, message: "No permission." });
  }
});

router.post("/signup", checkUserData, async (req, res) => {
  const { email, password, username } = req.body;
  const encryptedPassword = await encryptPassword(password);

  try {
    const userData = await users.findOneByEmail(email);
    const userTempData = await userTemps.findOneByEmail(email);

    if (userData.length || userTempData.length)
      throw new Error("Email already exists.");
    const verifyCode = await generateVerifyCode(email);

    await userTemps.create({
      email,
      verifyCode,
      username: username || createNickname(),
      ...encryptedPassword,
    });

    sendJoinMail(email, verifyCode);

    res.status(201).json({ state: true, message: "Request Success." });
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.get("/verify", async (req, res) => {
  const { email } = req.query;

  try {
    const userTempData = (await userTemps.findOneByEmail(email))[0];
    const userData = (await users.findOneByEmail(email))[0];

    if (userTempData) res.json({ state: true, cert: false });
    else if (userData) throw new Error("Already Verification.");
    else throw new Error("No Userdata.");
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.get("/verify/:code", async (req, res) => {
  const { code } = req.params;
  const { checkState } = req.query;

  try {
    const userTempData = (await userTemps.findOneByVerifyCode(code))[0];

    if (userTempData && checkState) res.json({ state: true });
    else if (userTempData) {
      await users.create({
        email: userTempData.email,
        username: userTempData.username,
        hashedPassword: userTempData.hashedPassword,
        salt: userTempData.salt,
        cert: true,
      });

      const { accessToken, refreshToken } = await generateToken(
        {
          email: userTempData.email,
          username: userTempData.username,
        },
        false,
      );

      await userTemps.deleteOneByVerifyCode(code);

      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
          state: true,
          message: "Login success.",
          data: { username: userTempData.username },
        });
    } else throw new Error("No Userdata.");
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
      .json({
        state: true,
        message: "Login success.",
        data: { username: userData.username },
      });
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

router.post("/find/password", async (req, res) => {
  const { email } = req.body;

  try {
    const userData = await users.findOneByEmail(email);

    if (userData.length) {
      const verifyCode = await generateVerifyCode(email);

      await expireAuths.create({
        email,
        verifyCode,
      });

      sendFindMail(email, verifyCode);

      res.json({ state: true, message: "Request Success." });
    } else throw new Error("No join info.");
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.get("/find/password/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const expireAuthData = (await expireAuths.findOneByVerifyCode(code))[0];

    res.json({ state: true, email: expireAuthData.email });
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

router.patch("/find/password", async (req, res) => {
  const { newPassword, code } = req.body;

  try {
    const expireAuthData = (await expireAuths.findOneByVerifyCode(code))[0];
    const encryptedPassword = await encryptPassword(newPassword);

    if (expireAuthData) {
      await users.updateByEmail(expireAuthData.email, encryptedPassword);
      await expireAuths.deleteOneByVerifyCode(code);

      res.json({ state: true, message: "Password change success." });
    } else throw new Error("Expired Code.");
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
});

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
