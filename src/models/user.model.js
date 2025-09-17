import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';                       // password ko hash karne ke liye
import jwt from 'jsonwebtoken';                    // json web token generate karne ke liye, jo user ko authenticate karne ke liye use hota hai

const userSchema = new Schema(
  {
    userName:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      index:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
    },
    fullName:{
      type:String,
      required:true,
      trim:true,
      index:true
    },
    avatar:{
      type:String,        //cloudinary url
      required:true,
    },
    coverImage:{
      type:String,        //cloudinary url
    },
    watchHistory:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
      }
    ],
    password:{
      type:String,
      required:[true, "Password is required"],
    },
    refreshToken:{
      type:String,
    }

    },
    {timestamps:true }    //isse created at and updated at mil jata hai 
    
);



//this is to do encrypt password before saving user

userSchema.pre("save", async function(next){          //we don't use arrow function here because context pta hona is necessary here wrna we can't access user data
                                                      //also we use next cause hu, middleware use kr rhe hai
  if(!this.isModified("password")) return next();     //agar password modify nhi hua to next pe chala jao
    this.password = bcrypt.hash(this.password, 10)   //10 is salt rounds, jitna zyada hoga utna secure hoga but time bhi zyada lagega
    next()                                             
});

//bcrypt use hoga to check password
userSchema.methods.isPasswordCorrect = async function 
(Password){
    return await bcrypt.compare(password, this.password)      //ye function true ya false return karega           
}

userSchema.methods.generateAccessToken = function(){        //used to generate access token (jwt token)
  return jwt.sign(
    {
    _id: this._id,
    email: this.email,
    userName: this.userName,
    fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
  )
}       





userSchema.methods.generateRefreshToken = function(){       //.used to generate refresh token (jwt token)
  return jwt.sign(
    {
    _id: this._id,
    email: this.email,
    userName: this.userName,
    fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES}
  )
}        //used to generate refresh token (jwt token)


export const user = mongoose.model("User". userSchema);