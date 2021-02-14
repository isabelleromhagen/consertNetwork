const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Feed = require("../models/Feed");
const User = require("../models/User");

// @route    GET /feed
// @desc     Get all posts
// @access   Public
router.get("/",
  [
    check("username", "Name is required").not().isEmpty(),
  ], async (req, res) => {
  try {
    const feed = await Feed.find().sort({date:-1}).populate("feed", ["username"]);
    res.json(feed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET /feed/:id
// @desc     Get post by id
// @access   Public
router.get("/:id", async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
      const post = await Feed.findById(req.body._id);
      return res.json(post);
      
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
      const { username, userId, bandStatus, bandname } = req.body;

    try {
        post = new Feed({
        username,
        userId,
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

// @route    POST /feed/comment
// @desc     Add comment to post
// @access   Public
router.post("/comment", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.body.userId).select("-password");
        const post = await Feed.findById(req.body._id);

        const newComment = {
          text: req.body.text,
          username: user.username,
          userId: req.body.userId,
          user: req.body.userId
        }

        post.comments.unshift(newComment);
        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route    PUT /feed/like
// @desc     Add or remove like on post
// @access   Private

router.put("/like", async (req,res) => {
  try {

    const post = await Feed.findById(req.body._id);

    if(post.likes.some((like) => like.user.toString() === req.body.userId)) {
      
      post.likes = post.likes.filter(({user}) => user.toString() !== req.body.userId);

    } else {
      post.likes.unshift({user: req.body.userId});
    }

    await post.save();
    return res.json(post.likes);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;