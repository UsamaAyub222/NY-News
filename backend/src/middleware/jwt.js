const jwt = require("jsonwebtoken");

exports.authJwt = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (token) {
      const user = jwt.verify(token, process.env.MY_SECRET);
      if (user) {
        req.userData = user;
        next();
      } else {
        return res.status(404).json({ msg: "No content available."  });
      }
    }
  } catch (err) {
    return res.status(401).json({ error: "Authenticate using a valid token." });
  }
};