const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const User = require("../models/User");

// @route    GET /users/me
// @desc     Get current users profile
// @access   Private

router.get("/me", auth, async (req, res) => {
  try {
      if (mongoose.isValidObjectId(req.user.id)) {
        const objectId = mongoose.Types.ObjectId(req.user.id);
        const currentUser = await User.findById(req.user.id).populate("user", ["username"]);

        if (!currentUser) {
          return res.status(400).json({ msg: "Could not find current user..." });
        }

        res.json(currentUser);
      }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST /users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("username", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 368888 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET /profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("user", ["username"]);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
// router.get("/user/:user_id", 
//   checkObjectId("user_id"),
//   async ({ params: { user_id } }, res) => {
//     try {
//       const user = await User.findOne({ 
//         user: user_id
//       }).populate("user", ["username"]);

//       if (!profile) return res.status(400).json({ msg: "Profile not found" });

//       return res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).json({ msg: "Server error" });
//     }
//   }
// );

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;