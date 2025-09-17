import mongoose from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";       // basic crud operation ke alawa crazy quiries ke liye use hota hai ye

const videoSchema = new Schema(
  {
    videoFile:{
      type:String,       //cloudinary url
      required:true,
    },
    thumbnail:{
      type:String,       //cloudinary url
      required:true,
    },
    title:{
      type:String,       
      required:true,
    },
    description:{
      type:String,      
      required:true,
    },
    duration:{
      type:Number,       //in seconds from cloudinary
      required:true,
    },
    views:{
      type:Number,
      default:0,
    },
    isPublished:{
      type:Boolean,
      default:true,
    },
    videoOwner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",

    }






  },
  { timestamps: true }
);

videoSchema.Schema.plugin(mongooseAggregatePaginate);      // ye plugin add karna hota hai to use "mongoose-aggregate-paginate-v2"

export const Video = mongoose.model("Video", videoSchema);