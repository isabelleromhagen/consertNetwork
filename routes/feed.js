const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const Feed = require("../models/Feed");

// @route    GET /feed
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
  try {
    const feed = await Feed.find().populate("feed", ["username"]);
    res.json(feed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST /feed
// @desc     Post new post
// @access   Public
router.post("/", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const { username, bandStatus, bandname } = req.body;

    try {
        post = new Feed({
        username,
        bandStatus,
        bandname
      });

      await post.save();

    return res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;