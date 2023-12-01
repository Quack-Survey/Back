const users = require("../../models/user");
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
    return false;
  }
};

const checkAuthorization = async (req, res, next) => {
  const bearerToken = req.headers.authorization.slice(7);

  let userData = {};

  try {
    const decoded = await verifyToken("access", bearerToken);

    if (!decoded) {
      const decoded = await verifyToken("refresh", bearerToken);

      if (!decoded) throw new Error("No Data.");

      userData = await getUserData(decoded.email);

      if (!userData) throw new Error("No Data.");

      const { accessToken } = await generateToken(
        { email: decoded.email, username: decoded.username },
        true,
      );

      res.setHeader("Access-Control-Expose-Headers", "accessToken");
      res.setHeader("accessToken", accessToken);
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
    res.status(401).json({ state: false, message: "No authentication." });
  }
};

module.exports = { checkAuthorization };
