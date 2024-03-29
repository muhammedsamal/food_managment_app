import express from "express";
import Posts from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const id = req.body.userId;
    const user = await User.findById(id);
    if (user) {
      const newPost = new Posts(req.body);
      await newPost.save();
      res.status(200).json(newPost);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPostsOfDistrict = async (req, res) => {
  try {
    const { district } = req.body;
    const posts = await Posts.find({ district: district });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

// update/edit post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default router;
