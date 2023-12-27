const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log(`File Upload Success : ${response.url}`);
        return response;
    } catch (error) {
        console.log(`File Upload Failed : ${error.message}`);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = uploadOnCloudinary;