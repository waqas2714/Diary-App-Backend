const { default: mongoose } = require("mongoose");
const Post = require('../models/Post');

//Get All Posts
const getPosts = async (req,res)=>{
    try {
        const posts = await Post.find().sort("-createdAt");
        if (!posts) {
            res.status(404).json({error: "Post not found."});
        }
        res.status(200).json(posts);
    } catch (err) {
         res.json({error : err.message});
    }
}

//Create Post
const createPost = async (req,res)=>{
   try {
    const {date, title, content} = req.body;
    const post = await Post.create({
        date,
        title,
        content
    })
    res.status(200).json(post);
   } catch (err) {
        res.status(400).json({error : err.message})
   }
    
}

//Get Post
const getPost = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error : "Post not found."});
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            res.status(400).json({error: "Post not found."});
        }
        res.status(200).json(post);
    } catch (err) {
         res.json({error : err.message});
    }
     
 }

 //Delete Post
const deletePost = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error : "Post not found."});
    }
    try {
        const post = await Post.findById(id).deleteOne();
        if (!post) {
            res.status(400).json({error: "Post not deleted."});
        }
        res.status(200).json(post);
    } catch (err) {
         res.json({error : err.message});
    }
     
 }

//Update Post
const updatePost = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error : "Post not found."});
    }
    try {
        const post = await Post.findByIdAndUpdate({_id : id}, req.body,{
            new: true,
            runValidators: true,
        });
        if (!post) {
            res.status(400).json({error: "Post not found."});
        }
        res.status(200).json(post);
    } catch (err) {
         res.json({error : err.message});
    }
     
 }


 module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
}