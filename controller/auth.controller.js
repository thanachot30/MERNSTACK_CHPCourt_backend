import User from '../models/user.model.js';
import { errorHandle } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';



export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log(hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error);
    }
    
}   

export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    // console.log(email,password);
    try{
        const validUser = await User.findOne({email:email})
        // console.log(validUser);
        if(!validUser) return next(errorHandle(404,'User not found!'));
        //cmpare password bcryp to noumal
        // console.log(validUser) 
        const validPass = bcryptjs.compareSync(password,validUser.password)
        // console.log(validPass);
        if(!validPass) return next(errorHandle(401,'Worng cridentials!'));
        //
        const token = Jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        //not include password
        const {password:pass,...rest} = validUser._doc;
        // console.log(token)
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }catch(error){
        next(error);    
    }
}

export const google = async (req,res,next)=>{
    try {
        console.log(req.body)
        const user = await User.findOne({email:req.body.email});
        if(user){
            const token = Jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass, ...rest} = user._doc;
            res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase()
                                    ,email:req.body.email
                                    ,password:hashedPassword
                                    ,avatar:req.body.photo
                                })
            await newUser.save();
            const token = Jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const { password:pass, ...rest } = newUser._doc;
            res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
}