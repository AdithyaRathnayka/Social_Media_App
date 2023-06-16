import express from "express";
import {getFeedPosts, getUserPosts, likePosts} from "../controllers/posts.js";
import {verifyTocken} from "../middleware/auth.js";

const router = express.Router();

//read 
router.get("/", verifyTocken, getFeedPosts);
router. get(":/userId/posts", verifyTocken, getUserPosts);

//update 
router.patch("/:id/like", verifyTocken, likePosts);

export default router; 
