const users = require("../../models/user");
const userTemps = require("../../models/userTemp");
const { verifyPassword } = require("./encryptUtil");
const crypto = require("crypto");

const createNickname = () => {
  const adjective = [
    "기쁜",
    "차분한",
    "추운",
    "시원한",
    "귀여운",
    "따분한",
    "공정한",
    "친절한",
    "예리한",
    "건강한",
  ];
  const noun = [
    "쿼카",
    "돌고래",
    "고양이",
    "강아지",
    "다람쥐",
    "여우",
    "사슴",
    "반달곰",
    "나무늘보",
    "고라니",
  ];
  return `${adjective[Math.floor(Math.random() * 10)]} ${
    noun[Math.floor(Math.random() * 10)]
  }`;
};

const generateVerifyCode = async (target) => {
  const EMAIL_SECRET = process.env.SHA256_SECRET;

  const verifyCode = crypto
    .createHmac("sha256", EMAIL_SECRET)
    .update(`${Date.now()} ${target}`)
    .digest("hex");

  return verifyCode;
};

const getUserData = async (email, password) => {
  const userData = (await users.findOneByEmail(email))[0];
  const userTempData = (await userTemps.findOneByEmail(email))[0];

  if (userTempData) throw new Error("Email not verified.");
  if (!userData) throw new Error("Email does not match.");

  const verifyState = await verifyPassword(
    password,
    userData.salt,
    userData.hashedPassword,
  );

  if (!verifyState) throw new Error("Password does not match.");

  return userData;
};

module.exports = { createNickname, generateVerifyCode, getUserData };
