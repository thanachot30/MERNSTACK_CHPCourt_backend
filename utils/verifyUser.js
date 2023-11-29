import {errorHandle} from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    try {
        const token = req.cookies.access_token;
        console.log("verify token:", token)
        if(!token) return next(errorHandle(401,'Unauthorized'));

        // process.env.JWT_SECRET
        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
            if(error) return next(errorHandle(403,"Forbiden"));
            console.log("verify user:", user) //user is object {id:,iat:}
            req.user = user;
            next();
        })

    } catch (error) {
        next(error)
    }

}