const express = require("express")
const { verifyToken } = require("../utils/verifyToken")
const relationshipController = require("../controllers/relationship.controller")
const router = express.Router()

router.use(verifyToken)
router.post("/:followingID/follow", relationshipController.followUser)
router.post("/:followingID/unfollow", relationshipController.unfollowUser)
router.get("/followers", relationshipController.getFollowerList)
router.get("/followings", relationshipController.getFollowingList)

module.exports = router
