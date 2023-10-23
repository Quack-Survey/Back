const checkUserData = async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  const { path } = req.route;

  try {
    if (!email && path !== "/password") throw new Error("No email.");

    if (!password) throw new Error("No password.");

    if (!newPassword && path === "/password")
      throw new Error("No new password.");

    next();
  } catch (err) {
    res.status(400).json({ state: false, message: err.message });
  }
};

module.exports = { checkUserData };
