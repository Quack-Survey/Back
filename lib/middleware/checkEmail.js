const users = require("../../models/user");

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const data = await users.findOne(email);

    if (data.length) {
      res.status(500).json({ state: false, message: "Email already exists." });
    } else if (!email) {
      res.status(500).json({ state: false, message: "No email." });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "unknown error." });
  }
};

module.exports = { checkEmail };
