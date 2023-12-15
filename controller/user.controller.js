import {errorHandle} from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res,next)=>{
    try {
        res.json({
            message:'Api rount is working'
        })
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandle(401,"you can only update your own account"))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        },
        {new:true})
        // console.log(updateUser);
        const {password,...rest} = updateUser._doc
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandle(401,'you can only delete your account'))
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id,{new:true});
        console.log(deleteUser);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
}



