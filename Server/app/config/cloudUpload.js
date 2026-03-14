const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

async function uploadFile(imagePaths) {

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const uploadPromises = imagePaths.map((imgPath) =>
            cloudinary.uploader.upload(imgPath, options)
        );

        const results = await Promise.all(uploadPromises);

        return results.map(result => result.secure_url);

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
}


async function deleteFile(publicId) {
    cloudinary.uploader.destroy(publicId, function (error, result) {
        return {
            result,
            error
        }
    })
        .then(resp => console.log(resp))
        .catch(_err => console.log("Something went wrong, please try again later."));
}

module.exports = { uploadFile, deleteFile }