const users = require("../../models/user");
const { cookieOptions } = require("../config/cookieConfig");
const { verifyToken, generateToken } = require("../utils/jwtUtil");

const getUserData = async (email) => {
  try {
    const userData = (await users.findOneByEmail(email))[0];

    return {
      userId: userData._id,
      hashedPassword: userData.hashedPassword,
      salt: userData.salt,
    };
  } catch (err) {
    return null;
  }
};

const checkAuthorization = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  let userData = {};

  try {
    const decoded = await verifyToken("access", accessToken);

    if (!decoded) {
      const decoded = await verifyToken("refresh", refreshToken);

      if (!decoded) throw new Error("No Data.");

      userData = await getUserData(decoded.email);

      if (!userData) throw new Error("No Data.");

      const { accessToken } = await generateToken(
        { email: decoded.email, username: decoded.username },
        true,
      );

      res.cookie("accessToken", accessToken, cookieOptions);
    } else {
      userData = await getUserData(decoded.email);

      if (!userData) throw new Error("No Data.");
    }

    req.body = {
      ...req.body,
      ...userData,
    };

    next();
  } catch (err) {
    res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(401)
      .json({ state: false, message: "No authentication." });
  }
};

module.exports = { checkAuthorization };
