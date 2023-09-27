const users = require("../../models/user");
const { verifyPassword } = require("./encryptUtil");

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

const getUserData = async (email, password) => {
  const userData = (await users.findOneByEmail(email))[0];

  if (!userData) throw new Error("Email does not match.");

  const verifyState = await verifyPassword(
    password,
    userData.salt,
    userData.hashedPassword,
  );

  if (!verifyState) throw new Error("Password does not match.");

  return userData;
};

module.exports = { createNickname, getUserData };
