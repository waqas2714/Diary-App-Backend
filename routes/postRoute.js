const express = require('express');
const { getPosts, createPost, getPost, deletePost, updatePost } = require('../controllers/postController');
const router = express.Router();
//Routes
router.get("/",getPosts);
router.post("/",createPost);
router.get("/:id",getPost);
router.delete("/:id",deletePost);
router.patch("/:id",updatePost);

module.exports = router