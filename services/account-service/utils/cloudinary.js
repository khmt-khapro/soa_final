const multer = require("multer")
const upload = multer()
const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")

cloudinary.config({
    cloud_name: "khait",
    api_key: "839592211368859",
    api_secret: "HWZZCKSzJajJIR6O1Kzfzzy-ioQ",
})

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result.secure_url)
            }
        })
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

module.exports = { upload, uploadToCloudinary }
