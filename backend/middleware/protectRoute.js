import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error:"Not authorized, no token provided",
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                error:"Not authorized, token is invalid",
            })
        }
        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                error:"Not authorized, user not found",
            })
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in protected route",error);
       return res.status(500).json({  
        error:"Internal Server error",
       })
    }
}
export default protectRoute;