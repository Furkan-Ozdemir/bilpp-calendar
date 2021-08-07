const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const path = require("path");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/private", auth, (req, res) => {
  const today = new Date();
  res.render("private", {
    selectedDate:
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear(),
  });
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.cookie("auth_token", token);

    res.render("private", {
      selectedDate: "august",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.cookie("auth_token", token);
    res.redirect("/private");
  } catch (error) {
    res.redirect("/");
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
router.get("/users/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send("no user found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(err);
  }
});
router.patch("/users/:name", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const name = req.params.name;

  if (!isValid) {
    return res.status(400).send("not valid update parameters");
  }

  try {
    // const user = await User.findOneAndUpdate({ name }, req.body, {
    //   new: true,
    //   runValidators: true,
    //   useFindAndModify: false,
    // }); // yeni kullanıcıyı return ediyor.
    const user = await User.findOne({ name });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOneAndDelete({ name });

    if (!user) return res.status(404).send("no user found");
    res.send(name, " deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
