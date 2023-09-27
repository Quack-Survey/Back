const crypto = require("crypto");
const util = require("util");

const REFEAT = Number(process.env.ENCRYPT_REFEAT);
const LENGTH = Number(process.env.ENCRYPT_LENGTH);
const METHOD = process.env.ENCRYPT_METHOD;
const ENCODE_METHOD = process.env.ENCODE_METHOD;

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
  const salt = await randomBytesPromise(LENGTH);

  return salt.toString(ENCODE_METHOD);
};

const encryptPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, REFEAT, LENGTH, METHOD);
  const hashedPassword = key.toString(ENCODE_METHOD);

  return { hashedPassword, salt };
};

const verifyPassword = async (targetPassword, userSalt, userPassword) => {
  const key = await pbkdf2Promise(
    targetPassword,
    userSalt,
    REFEAT,
    LENGTH,
    METHOD,
  );
  const hashedPassword = key.toString(ENCODE_METHOD);

  if (hashedPassword === userPassword) return true;
  return false;
};

module.exports = { encryptPassword, verifyPassword };
