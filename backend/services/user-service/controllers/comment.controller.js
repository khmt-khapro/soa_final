const Comment = require("../models/comment.model")
const Post = require("../models/post.model")
const User = require("../models/user.model")
const BaseError = require("../utils/error-handling/baseError")
const { sendMessageAMQP } = require("./rabbitmq")

// -----------------------COMMENT IN  A POST-----------------------------------
const createComment = async (req, res, next) => {
    try {
        const { id } = req.user
        const { postID } = req.params
        const { content, parent } = req.body

        // check if post exists
        const isExistPost = await Post.findById(postID)
            .select("_id author")
            .populate("author", "username")
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

        const sender = await User.findById(id).select("username")
        console.log("🚀 ~ file: comment.controller.js:39 ~ createComment ~ sender:", sender)
        // send notification to queue
        const message = {
            type: "comment",
            recipient: isExistPost.author,
            sender: id,
            post: postID,
            comment: newComment._id,
            message: `${sender.username} commented on your post`,
        }

        sendMessageAMQP({ queueName: "notification", message })
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
        // const _comment = await Comment.findOne({ _id: commentID })
        // if (_comment.author.toString() !== id) {
        //     return next(new BaseError(401, "Unauthorized"))
        // }

        // await Comment.findByIdAndDelete(commentID)

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentID,
            author: { $eq: id },
        })

        if (!deletedComment) {
            return next(new BaseError(400, "Invalid comment id or can not delete comment"))
        }

        res.status(200).json({
            status: "success",
            message: "Delete comment successfully",
        })

        // delete all reply comments
        // await Comment.deleteMany({ parent: commentID })

        // send message to queue to delete all reply comments
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
            data: { comments, comment_count: comments.length },
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

        // send message to queue to remove notification
        const message = {
            type: "comment",
            sender: id,
            comment: commentID,
        }

        sendMessageAMQP({ queueName: "unlike", message })
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

        const { post_id, author } = await Comment.findById(commentID)
            .select("author post_id")
            .populate("author", "username")

        // send notification to queue
        const message = {
            type: "like",
            recipient: author._id,
            sender: id,
            post: post_id,
            comment: commentID,
            message: `${author.username} like your comment`,
        }

        sendMessageAMQP({ queueName: "notification", message })
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
