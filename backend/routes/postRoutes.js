const express = require("express");
const postRouter = express.Router();

const Post = require("../model/post.model");
const authenticateToken = require("../middleware/authorization");

// Create post
postRouter.post("/create-post", authenticateToken, async (req, res) => {
  const {
    brand,
    condition,
    title,
    description,
    image,
    location,
    price,
    name,
    phoneNumber,
  } = req.body;
  const userID = req.user._id;

  if (!brand) {
    return res.status(400).json({
      message: `Brand is required`,
    });
  }

  if (!condition) {
    return res.status(400).json({
      message: `Condition is required`,
    });
  }

  if (!title) {
    return res.status(400).json({
      message: `Title is required`,
    });
  }

  if (!description) {
    return res.status(400).json({
      message: `Description is required`,
    });
  }

  if (!location) {
    return res.status(400).json({
      message: `Location is required`,
    });
  }

  if (!price) {
    return res.status(400).json({
      message: `Price is required`,
    });
  } else if (price < 0) {
    return res.status(400).json({
      message: `Price should be greater then 0`,
    });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const post = new Post({
      brand,
      condition,
      title,
      description,
      image,
      location,
      price,
      name,
      phoneNumber,
      user: userID,
    });

    await post.save();

    return res.status(201).json({
      error: false,
      post,
      message: `Post created successfully`,
    });
  } catch (err) {
    console.log(`Error creating post:`, err);
    return res.status(500).json({
      error: true,
      message: `Failed to create post`,
    });
  }
});

// Edit post
postRouter.put("/edit-post/:id", authenticateToken, async (req, res) => {
  const postId = req.params.id;
  const {
    brand,
    condition,
    title,
    description,
    image,
    location,
    price,
    name,
    phoneNumber,
  } = req.body;
  const { _id } = req.user;

  if (
    !brand &&
    !condition &&
    !title &&
    !description &&
    !image &&
    !location &&
    !price &&
    !name &&
    !phoneNumber
  ) {
    return res.json({
      message: `No changes provided`,
    });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      { _id: postId, userId: _id },
      { new: true },
    );

    if (!post) {
      return res.status(404).json({
        error: true,
        message: `No post found`,
      });
    }

    if (brand) post.brand = brand;
    if (condition) post.condition = condition;
    if (title) post.title = title;
    if (description) post.description = description;
    if (image) post.image = image;
    if (location) post.location = location;
    if (price) post.price = price;
    if (name) post.name = name;
    if (phoneNumber) post.phoneNumber = phoneNumber;

    await post.save();

    return res.status(200).json({
      error: false,
      post,
      message: `Post updated`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: `Interval server error`,
    });
  }
});

// Get user post
postRouter.get("/get-post", authenticateToken, async (req, res) => {
  const { _id } = req.user;

  try {
    const post = await Post.find({ user: _id }).sort({ createdOn: -1 });
    if (!post) {
      console.log("No post found");
    }

    return res.json({
      error: false,
      post: post,
      message: `User posts`,
    });
  } catch (err) {
    console.log({ error: err });
    return res.status(500).json({
      error: true,
      message: `Interval error`,
    });
  }
});

// Delete post
postRouter.delete(
  "/delete-post/:postId",
  authenticateToken,
  async (req, res) => {
    const post_id = req.params.postId;
    const { _id } = req.user;

    try {
      const post = await Post.findByIdAndDelete({ _id: post_id, user: _id });

      if (!post) {
        return res.status(400).json({ message: `No post found` });
      }
      await post.deleteOne({ post: post_id, user: _id });

      return res.json({
        error: false,
        message: `Post deleted`,
      });
    } catch (err) {
      return res.json({
        error: true,
        message: `Failed to delete post`,
      });
    }
  },
);

// Get all posts
postRouter.get("/all-posts", async (req, res) => {
  try {
    const post = await Post.find().sort({ createdOn: -1 });

    return res.status(200).json({
      error: false,
      post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      message: `Failed to get all posts`,
    });
  }
});

// Post details
postRouter.get("/post-details/:postID", async (req, res) => {
  const postId = req.params.postID;

  try {
    const postInfo = await Post.findOne({ _id: postId });

    if (!postInfo) {
      return res.status(404).json({ message: "No post found" });
    }

    return res.json(postInfo);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      Error: error.message,
    });
  }
});

module.exports = postRouter;
