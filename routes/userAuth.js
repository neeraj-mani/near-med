const userAuthRoute = require("express").Router();
const userModel = require("../models/userinfo");

userAuthRoute.post("/user/auth", async function (req, res) {
  let email = req.body.email;
  let pass = req.body.pass;
  console.log(email, pass);
  const user = await userModel.findOne({ email, password: pass });
  console.log(user);
  if (!user) {
    return res.json({
      authenticated: false,
    });
  }
  return res.json({
    name: user.name,
    email: user.email,
    shop: user.shop,
    authenticated: true,
  });
});

module.exports = userAuthRoute;
