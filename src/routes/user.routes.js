import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1, // Only one Avatar-File is needed
        },
        {
            name: "coverImage",
            maxCount: 1, // Only one Cover-Image is required
        },
    ]),
    registerUser
);

export default router;