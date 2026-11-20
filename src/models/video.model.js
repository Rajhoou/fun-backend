import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
) /* here we are creating a new mongoose schema called videoSchema, which defines the structure of the Video model. The schema has fields for videoFile, thumbnail, title, description, duration, views, isPublished, and owner. The timestamps option is set to true, which will automatically add createdAt and updatedAt fields to the schema. */

videoSchema.plugin(mongooseAggregatePaginate)/* here we are adding the mongoose-aggregate-paginate-v2 plugin to the videoSchema, which will allow us to paginate the results of aggregate queries on the Video model. */

export const Video = mongoose.model("Video", videoSchema)/* here we are creating a mongoose model called "Video" using the videoSchema, and exporting it so that it can be used in other parts of the application. */