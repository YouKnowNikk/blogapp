import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  
  export const genrateAccessToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.genrateAccessToken();
  
      await user.save({ validateBeforeSave: false })
      return accessToken
    } catch (error) {
      throw new ApiError(500, " something wnet wrong in genrating tokens")
    }
  }

  const userRegistration = asyncHandler(async (req, res) => {
    const {
      fullName,
      email,
      password,
      
    } = req.body;
  
    if (!(fullName && email &&  password )) {
      throw new ApiError(400, "All fields are required");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Enter a valid email address");
    }
    if (!isStrongPassword(password)) {
      throw new ApiError(400, "Password should be strong with minimum 8 characters, special character, and number");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser) {
        throw new ApiError(409, "User already exists");
      } 
    }
  
    
  
    const user = await User.create({
        fullName,
        email,
       
        password
      })
      const createdUser = await User.findById(user._id).select("-password ");
      if(!createdUser){
        throw new ApiError(500,"internal server error")
      }
      return res.status(201).json(new ApiResponse(201,createdUser,"user Register successfully"))
  
  });


  
  const userLogin = asyncHandler(async (req,res)=>{
    const{email,password}=req.body;
    if (!(email && password)) {
        throw new ApiError(400, "Email and password are required");
      }
    
      const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "Credential are wrong")
    }
    const ispasswordValid = user.isPasswordCorrect(password);
    if(!ispasswordValid){
        throw new ApiError(404, "Credential are wrong")
    }
    const accessToken= await genrateAccessToken(user._id);
    
    const loggedInuser = await User.findById(user._id).select("-password ")
    const options = {
        // httpOnly: true,
        secure: false,  // Set to true if serving over HTTPS
        sameSite: 'Lax',  // or 'None' if cross-site
        path: '/',
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInuser, accessToken
            },
            "User logged In Successfully"
        )
    )
})
  export{userRegistration,userLogin}