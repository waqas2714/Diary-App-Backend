const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPost, deletePost, updatePost } = require('../controllers/postController');
const requireAuth = require('../middlewares/auth');

//Middleware for all the routes
router.use(requireAuth)
//Routes
router.get("/",getPosts);
router.post("/",createPost);
router.get("/:id",getPost);
router.delete("/:id",deletePost);
router.patch("/:id",updatePost);

module.exports = router