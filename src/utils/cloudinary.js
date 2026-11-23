
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // file system: helps read, write, and delete files

/*Suppose a user submits a registration form with profile-pic.jpg.
Multer catches the file and drops a temporary copy into ./public/temp/profile-pic.jpg on your server's local disk so your code has a 
real file path to work with.
Your backend uploads ./public/temp/profile-pic.jpg -> Cloudinary (Remote cloud)
Your uploadOnCloudinary("./public/temp/profile-pic.jpg") helper reads that temporary local file and 
uploads it to Cloudinary (the remote cloud storage).
Cloudinary stores/optimizes the image and sends back a response containing 
ts hosted URL.*/

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file 
        // as the upload operation got failed
        return null;
    }
}




/*const uploadResult = await cloudinary.uploader
    .upload(ry.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    }
    )
    .catch((error) => {
        console.log(error);
    });

console.log(uploadResult);*/

export { cloudinary, uploadOnCloudinary };









