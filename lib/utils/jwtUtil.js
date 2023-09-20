const { sign, verify } = require("jsonwebtoken");

const generateToken = async (payload, isRefresh) => {
  if (isRefresh) {
    return {
      accessToken: sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      }),
    };
  } else {
    return {
      accessToken: sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      }),
      refreshToken: sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
      }),
    };
  }
};

const verifyToken = async (type, token) => {
  let secretKey, decoded;

  try {
    switch (type) {
      case "access":
        secretKey = process.env.ACCESS_SECRET;
        break;
      case "refresh":
        secretKey = process.env.REFRESH_SECRET;
        break;
      default:
        throw new Error("No type.");
    }

    decoded = verify(token, secretKey);

    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
