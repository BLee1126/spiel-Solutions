// Json Web Token or JWT. npm i jsonwebtoken
const jwt = require("jsonwebtoken");

// Secret Key dotenv https://www.npmjs.com/package/dotenv
// require('dotenv').config();
const secret = "secrets are included";
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
