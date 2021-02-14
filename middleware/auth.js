const dotenv = require('dotenv');

dotenv.config()

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied!" });
  }

  try {
      jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something went wrong with the auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
