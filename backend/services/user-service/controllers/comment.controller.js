const Comment = require("../models/comment.model")
const Post = require("../models/post.model")
const BaseError = require("../utils/error-handling/baseError")

// -----------------------COMMENT IN  A POST-----------------------------------
const createComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params
        const { content, parent } = req.body

        // check if post exists
        const isExistPost = await Post.findById(postID).select("_id")
        if (!isExistPost) {
            return next(new BaseError(404, "Post not found"))
        }

        let query = null
        if (parent) {
            query = { type: "reply", author: id, post_id: postID, content, parent }
        } else {
            query = { author: id, post_id: postID, content }
        }

        // create new comment on post
        const newComment = new Comment(query)

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

// ----------------------- EDIT COMMENT IN A POST-----------------------------------
const editComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { commentID } = req.params
        const { content } = req.body

        // check if user is author, then allow update
        const _comment = await Comment.findOne({ _id: commentID })
        if (_comment.author.toString() !== id) {
            return next(new BaseError(401, "Unauthorized"))
        }
        const comment = await Comment.findByIdAndUpdate(commentID, { content })

        res.status(200).json({
            status: "success",
            message: "Edit comment successfully",
            data: { comment },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// ----------------------- DELETE COMMENT IN A POST-----------------------------------
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { commentID } = req.params

        // check if user is author, then allow delete
        const _comment = await Comment.findOne({ _id: commentID })
        if (_comment.author.toString() !== id) {
            return next(new BaseError(401, "Unauthorized"))
        }

        await Comment.findByIdAndDelete(commentID)

        res.status(200).json({
            status: "success",
            message: "Delete comment successfully",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// ----------------------- GET COMMENTS IN A POST-----------------------------------
const getComments = async (req, res, next) => {
    try {
        const { postID } = req.params
        console.log("🚀 ~ file: comment.controller.js:91 ~ getComments ~ postID:", postID)
        const { limit = 10 } = req.query

        const comments = await Comment.find({ post_id: postID, type: "comment" })
            .sort({ createdAt: "desc" })
            .limit(limit)
            .populate("author", "username avatar")
        console.log("🚀 ~ file: comment.controller.js:98 ~ getComments ~ comments:", comments)

        res.status(200).json({
            status: "success",
            message: "Get comments successfully",
            data: { comments, comment_count: comments.length },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// ----------------------- GET REPLY COMMENTS OF A COMMENT-----------------------------------
const getCommentsReply = async (req, res, next) => {
    try {
        const { commentID } = req.params
        const { limit = 10 } = req.query

        const comments = await Comment.find({ parent: commentID, type: "reply" })
            .sort({ createdAt: "desc" })
            .limit(limit)
            .populate("author", "username avatar")

        res.status(200).json({
            status: "success",
            message: "Get comments reply successfully",
            data: { comments },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------LIKE COMMENT-----------------------------------
const unlikeComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { commentID } = req.params

        // check if comment exists
        const comment = await Comment.updateOne(
            { _id: commentID, likes: { $in: [id] } },
            {
                $pull: { likes: id },
                $inc: { like_count: -1 },
            }
        )

        if (comment.modifiedCount === 0) {
            return next(new BaseError(400, "Fail to unlike comment, unkown error"))
        }

        res.status(200).json({
            status: "success",
            message: "Comment unliked",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// -----------------------LIKE COMMENT-----------------------------------
const likeComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { commentID } = req.params

        // check if comment exists
        const comment = await Comment.updateOne(
            { _id: commentID, likes: { $ne: id } },
            {
                $addToSet: { likes: id },
                $inc: { like_count: 1 },
            }
        )

        if (comment.modifiedCount === 0) {
            return next(new BaseError(400, "Fail to like comment, unkown error"))
        }

        res.status(200).json({
            status: "success",
            message: "Comment liked",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    getComments,
    getCommentsReply,
    likeComment,
    unlikeComment,
}
