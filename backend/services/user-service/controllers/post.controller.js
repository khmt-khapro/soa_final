const Post = require("../models/post.model")
const { uploadToCloudinary } = require("../utils/cloudinary.js")
const BaseError = require("../utils/error-handling/baseError.js")

// -----------------------CREATE NEW POST-----------------------------------
const createPost = async (req, res, next) => {
    try {
        let { id } = req.user
        let { content, privacy = 'public' } = req.body
        let imageUrl = ""

        // upload post image
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer)
        }

        // create new post
        let newPost = new Post({
            author: id,
            content,
            image: imageUrl,
            privacy
        })
        await newPost.save()

        res.status(200).json({ 
            status: "success", 
            message: "Post created", data: { newPost } 
        })
   
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------LIKE POST-----------------------------------
const likePost = async (req, res, next) => {
    try {
        let { id } = req.user
        let { postID } = req.body
        
        await Post.findOneAndUpdate(
            postID, 
            { $addToSet: { likes: id } }
        );

        res.status(200).json({ 
            status: "success", 
            message: "Post liked",
        })
   
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

module.exports = {
    createPost,
}