import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  secure: false,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("uploading photo ........ ");
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "public/img",
    });
    console.log("file is uploaded on cloudinary ", res.url);

    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    console.log("Cloudinary :: FILE UPLOAD ERROR ", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
