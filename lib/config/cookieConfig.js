const cookieOptions = {
  domain: process.env.API_PATH,
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

module.exports = { cookieOptions };
