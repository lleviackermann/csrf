const express = require("express");
const Victims = require("./victims");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("./form.ejs", { login: true });
});

router.get("/signup", (req, res) => {
  res.render("./form.ejs", { login: false });
});

router.get("/delete", (req, res) => {
  res.render("./delete.ejs");
});
router.get("/delete/account", async (req, res) => {
  const text = req.query.typetext;
  console.log(text);
  if (text === "Confirm to delete") {
    await Victims.findByIdAndDelete(req.cookies.victo_id);
    res.clearCookie('victo_id');
    res.redirect("/");
  } else {
    res.redirect("/users/delete");
  }
  // res.render("./delete.ejs");
});

router.post("/auth", async (req, res) => {
  if (req.body.confirmpassword) {
    if (req.body.confirmpassword !== req.body.password) {
      return res.redirect("/users/signup");
    }

    const user = await Victims.create({
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.redirect("/users/login");
  } else {
    const username = req.body.username;
    const password = req.body.password;
    const user = await Victims.findOne({
      username: username,
      password: password,
    });
    console.log(user);
    if (user) {
      res.cookie("victo_id", user._id, {
        maxAge: 60 * 60 * 1000,
      });
      req.user = true;
      res.redirect("/");
    } else {
      res.redirect("/users/login");
    }
  }
});
module.exports = router;
