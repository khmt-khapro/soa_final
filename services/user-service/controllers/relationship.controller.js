const Follow = require("../models/follow.model")
const User = require("../models/user.model")
const BaseError = require("../utils/error-handling/baseError")

// --------------------------------- FOLLOW A USER -----------------------------------
const followUser = async (req, res, next) => {
    try {
        const { id } = req.user
        const { followingID } = req.params

        // check if user is following himself
        if (id === followingID) {
            return next(new BaseError(400, "Can not follow yourself"))
        }

        // check if user exists
        const isValidUser = await User.findById(followingID).select("_id")
        if (!isValidUser) {
            return next(new BaseError(404, "User not found"))
        }

        // check if user is already following
        const isFollowing = await Follow.findOne({ follower_id: id, following_id: followingID })
        if (isFollowing) {
            return next(new BaseError(400, "You are already following this user"))
        }

        // create new following
        const following = await Follow.create({ follower_id: id, following_id: followingID })

        res.status(200).json({
            status: "success",
            message: "Follow user successfully",
            data: { following },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// --------------------------------- UNFOLLOW A USER -----------------------------------
const unfollowUser = async (req, res, next) => {
    try {
        const { id } = req.user
        const { followingID } = req.params

        // check if user is following himself
        if (id === followingID) {
            return next(new BaseError(400, "Can not unfollow yourself"))
        }

        // check if user exists
        const isValidUser = await User.findById(followingID).select("_id")
        if (!isValidUser) {
            return next(new BaseError(404, "User not found"))
        }

        // check if user is not following
        const isFollowing = await Follow.findOne({ follower_id: id, following_id: followingID })
        if (!isFollowing) {
            return next(new BaseError(400, "You are not following this user"))
        }

        // delete following
        const following = await Follow.findOneAndDelete({
            follower_id: id,
            following_id: followingID,
        })

        res.status(200).json({
            status: "success",
            message: "Unfollow user successfully",
            data: { following },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// --------------------------------- GET FOLLOWING LIST -----------------------------------
const getFollowingList = async (req, res, next) => {
    try {
        const { id } = req.user
        const { page, limit } = req.query

        const followingList = await Follow.find({ follower_id: id }).populate(
            "following_id",
            "username avatar"
        )

        res.status(200).json({
            status: "success",
            message: "Get following list successfully",
            data: { followingList },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// --------------------------------- GET FOLLOWER LIST -----------------------------------
const getFollowerList = async (req, res, next) => {
    try {
        const { id } = req.user
        const { page, limit } = req.query

        const followerList = await Follow.find({ following_id: id }).populate(
            "follower_id",
            "username avatar"
        )

        res.status(200).json({
            status: "success",
            message: "Get follower list successfully",
            data: { followerList },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowingList,
    getFollowerList,
}
