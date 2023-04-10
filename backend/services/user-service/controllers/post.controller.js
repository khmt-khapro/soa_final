const Post = require("../models/post.model")
const Comment = require("../models/comment.model")
const User = require("../models/user.model")
const { uploadToCloudinary } = require("../utils/cloudinary.js")
const BaseError = require("../utils/error-handling/baseError.js")
const PostLike = require("../models/postLike.model")

// -----------------------CREATE NEW POST-----------------------------------
const createPost = async (req, res, next) => {
    try {
        const { id } = req.user
        const { title, content, tags, timeToRead } = req.body

        // create new post
        const newPost = new Post({
            author: id,
            title,
            content,
            tags,
            time_to_read: timeToRead,
        })
        await newPost.save()

        res.status(200).json({
            status: "success",
            message: "Post created",
            data: { newPost },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------GET POSTS-----------------------------------
const getPostsRelevant = async (req, res, next) => {
    try {
        const { id } = req.user
        const { limit } = req.query

        // get user following tags
        const followingTags = await User.findById(id, "following_tags")

        const posts = await Post.find({ tags: { $in: followingTags } })
            .populate("author", "username avatar")
            .populate("tags", "name")
            .sort({ createdAt: -1 })

        res.status(200).json({
            status: "success",
            message: "Posts fetched",
            data: { posts },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

const getPostsLatest = async (req, res, next) => {
    try {
        const { limit } = req.query
        const posts = await Post.find()
            .sort({ createdAt: "desc" })
            .limit(limit)
            .populate("author", "username avatar")
            .populate("tags", "name")

        res.status(200).json({
            status: "success",
            message: "Posts fetched",
            data: { posts },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

const getPostsTop = async (req, res, next) => {
    try {
        const { limit } = req.query
        const posts = await PostLike.find()
            .sort({ count: -1 })
            .limit(limit)
            .populate("post_id", "author title tags time_to_read")
            .populate("author", "username avatar")
            .populate("tags", "name")

        res.status(200).json({
            status: "success",
            message: "Posts fetched",
            data: { posts },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------UPDATE POST CONTENT-----------------------------------
const updatePostContent = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params

        const _post = await Post.findOne(postID)

        // check if user is the author of the post
        if (_post.author.toString() !== id) {
            return next(new BaseError(401, "Unauthorized"))
        }

        const post = await Post.findByIdAndUpdate(postID, req.body)

        res.status(200).json({
            status: "success",
            message: "Post updated",
            data: { post },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------LIKE POST-----------------------------------
const likePost = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params

        const post = await Post.updateOne(
            { _id: postID },
            {
                $addToSet: { likes: id },
                $inc: { like_count: 1 },
            }
        )

        res.status(200).json({
            status: "success",
            message: "Post liked",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------UNLIKE POST-----------------------------------
const unlikePost = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params

        const post = await Post.updateOne(
            { _id: postID },
            {
                $pull: { likes: id },
                $inc: { like_count: -1 },
            }
        )

        res.status(200).json({
            status: "success",
            message: "Post unliked",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------COMMENT POST-----------------------------------
const commentPost = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params
        const { content } = req.body

        // create new comment on post
        const newComment = new Comment({
            author: id,
            post_id: postID,
            content,
        })

        await newComment.save()

        res.status(200).json({
            status: "success",
            message: "Post commented",
            data: { newComment },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

module.exports = {
    createPost,
    updatePostContent,
    likePost,
    unlikePost,
    commentPost,
    getPostsRelevant,
    getPostsLatest,
    getPostsTop,
}
