import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
},{timestamps:true});
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    else {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.genrateAccessToken = function() {
    return  jwt.sign({
          _id : this._id,
          email:this.email,
          fullName:this.fullName,
      },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10d'})
  
  }

  export const User = mongoose.model("User", userSchema)

