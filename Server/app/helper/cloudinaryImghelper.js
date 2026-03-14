function extractPublicId(imageUrl) {
    const parts = imageUrl.split("/");
    const fileWithExtension = parts.slice(-2).join("/");

    const publicId = fileWithExtension.split(".")[0];
    return publicId;
}

module.exports =  extractPublicId