const express = require("express")
const postController = require("../controllers/post.controller")
const commentController = require("../controllers/comment.controller")
const { verifyToken } = require("../utils/verifyToken")
const router = express.Router()

// public api
router.get("/top", postController.getPostsTop)
router.get("/latest", postController.getPostsLatest)

router.use(verifyToken)
router.get("/revelant", postController.getPostsRelevant)

router.post("/", postController.createPost)

router.patch("/:postID", postController.updatePost)

router.delete("/:postID", postController.deletePost)

router.post("/:postID/like", postController.likePost)

router.post("/:postID/unlike", postController.unlikePost)

// comment routes
router.post("/:postID/comments", commentController.createComment)

router.get("/:postID/comments/", commentController.getComments)

router.get("/:postID/comments/:commentID/replies", commentController.getCommentsReply)

router.patch("/:postID/comments/:commentID", commentController.editComment)

router.post("/:postID/comments/:commentID/like", commentController.likeComment)

router.post("/:postID/comments/:commentID/unlike", commentController.unlikeComment)

router.delete("/:postID/comments/:commentID", commentController.deleteComment)

module.exports = router
