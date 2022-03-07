const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt.config");

class UserController {
  register(req, res) {
    const user = new User(req.body);
    user
      .save()
      .then((user) => {
        res
          .cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
            httpOnly: true,
          })
          .json({ msg: "Success!" });

        console.log("msg from backend successfully registered!");
      })
      .catch((err) => res.json(err));
  }

  login(req, res) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user == null) {
          res.json({ msg: "Invalid login attempt" }); // email is not found
        } else {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err || !result) {
              console.log("invalid login");
              res.json({ msg: "Invalid login attempt" }); //incorrect pw
            } else {
              res.cookie("usertoken", jwt.sign({ _id: user._id }, secret), {
                httpOnly: true,
                path: "/",
                expires: new Date(new Date().getTime() + 100 * 1000),
              });
              res.json({ msg: "success!", user: user.firstName });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }

  getLoggedInUser(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  }

  logout(req, res) {
    res
      .clearCookie("usertoken", { path: "/" })
      .status(200)
      .json({ msg: "cookies cleared" });
  }
}

module.exports = new UserController();
