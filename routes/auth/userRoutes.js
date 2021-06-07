require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
const { User, Inventory } = require("../../models");

//WORKING
// CREATE a new user
// localhost:3001/auth/signup
router.post("/signup", (req, res) => {
  console.log(req.body);
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      // create default inventory
      defaultInventory = {
        name: `${newUser.dataValues.first_name}'s Greenhouse`,
        user_id: newUser.dataValues.id,
      };

      Inventory.create(defaultInventory).then((res) => {
        console.log(res);
      });

      res.status(200).json(newUser);

      const token = jwt.sign(
        {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          id: newUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({ token, user: newUser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err });
    });
});

//WORKING
// Login existing user
// localhost:3001/auth/login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Login Failed" });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      console.log(req.body.password);
      console.log("passwords dont match");
      return res.status(403).json({ message: "Login Failed" });
    } else {
      const token = jwt.sign(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({ token, user });
    }
  });
});

// WORKING
// User's data with associated inventory
// localhost:3001/auth/user/:id
router.get("/user/:id", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.params.id },
      include: Inventory,
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", tokenAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.user.id,
    },
  })
    .then((userData) => {
      return res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "error", err });
    });
});

//WORKING
// find all users
// localhost:3001/auth/users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
