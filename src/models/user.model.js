import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(/*yaha hami le userSchema banako cha jasma user ko data structure define gareko cha. Yo schema ma username, email, fullName, avatar, coverImage, watchHistory, password, ani refreshToken fields define gareko cha. Timestamps option true set gareko cha jasle automatically createdAt ani updatedAt fields add garcha.*/
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next)/* here we are adding a pre-save hook to the userSchema,
 which will be called before a user document is saved to the database. 
 The hook checks if the password field has been modified, and 
 if so, it hashes the password using bcrypt before saving it to the database. 
 The next() function is called to continue with the save operation. */ {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}/* yaha hami le userSchema ma ek method add gareko cha jasko naam isPasswordCorrect ho.
Yo method le user ko password verify garna kaam garcha. Yo method le password parameter lincha, 
ani bcrypt.compare function ko madat le provided password lai hashed password sanga compare garcha. 
Yo method le true ya false return garcha depending on whether the password matches or not. */

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,/* yaha process.env ko matlab chai environment variables ho. 
        Yo chai sensitive information jasto ki secret keys lai code ma directly hardcode nagari environment variables bata lincha. 
        Yo chai security ko lagi important ho. */
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}/* yaha hami le userSchema ma ek method add gareko cha jasko naam generateAccessToken ho. 
Yo method le user ko access token generate garna kaam garcha. 
Yo method le jwt.sign function ko madat le user ko _id, email, username, ani fullName lai payload ma rakhera access token generate garcha.
 Access token ko secret key ani expiry time environment variables bata lincha. 
 Yo method le generated access token return garcha. */
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,/* yaha refresh token generate garna ko lagi chai
         refresh token secret key environment variable bata lincha. Refresh token vaneko chai long-lived token ho jun chai 
         user ko session maintain garna kaam garcha.*/
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)