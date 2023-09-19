const users = require("../../models/user");
const { cookieOptions } = require("../config/cookieConfig");
const { verifyToken, generateToken } = require("../utils/jwtUtil");

const checkAuthorization = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  let decoded = null;
  console.log({ accessToken, refreshToken });
  try {
    if (accessToken) {
      decoded = await verifyToken("access", accessToken);
    } else if (refreshToken) {
      decoded = await verifyToken("refresh", refreshToken);

      const { accessToken } = await generateToken(
        { email: decoded.email, username: decoded.username },
        true,
      );

      res.cookie("accessToken", accessToken, cookieOptions);
    }
    const { _id } = (await users.findOneByEmail(decoded.email))[0];

    req.body = { ...req.body, userid: _id };
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: "No authentication." });
  }
};

module.exports = { checkAuthorization };
