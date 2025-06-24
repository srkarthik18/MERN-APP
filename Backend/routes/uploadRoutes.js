const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

require('dotenv').config()

//  Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Set up multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Create an Express router
const router = express.Router()

// Route to handle file uploads
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Function to handle the stream upload to Cloudinary
    const streamUpload = fileBuffer => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        })
        // Convert the file buffer to a stream and pipe it to Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(stream)
      })
    }

    const result = await streamUpload(req.file.buffer)
    res.status(200).json({ imageUrl: result.secure_url })
  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).json({ message: 'Error uploading file', error })
  }
})

module.exports = router
