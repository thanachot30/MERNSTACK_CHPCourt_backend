import {errorHandle} from "../utils/error.js"
import {pool} from "./db.controller.js"


export const createMember = async(req,res,next)=>{
    try {
        const {name,phone} = req.body;
        const [result] = await pool.query('INSERT INTO Member(name,address,phone,email) value(?,?,?,?)',[name,"dummy",phone,"dummy"])
        res.status(200).json({id:result.insertId,name:name});
        // const [result] = await pool.query('INSERT INTO Member(name,address,phone,email) value(?,?,?,?)',[name,address,phon,email])
        
    } catch (error) {
        next(error);
    }
}

export const getMember = async(req,res,next)=>{
    try {
        // const allheader = req.headers;
        // console.log(allheader.oath);
        const [rows] = await pool.query("SELECT * FROM Member ");
        res.status(200).json(rows);

    } catch (error) {
        next(error)
    }
}