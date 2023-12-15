import {errorHandle} from "../utils/error.js"
import {pool} from "./db.controller.js"


export const getBook = async(req,res,next)=>{
    try {
        const date = req.params.date;
        console.log(date)
        const [rows] = await pool.query(`SELECT * from Booking WHERE bookingdate = '${date}'`) //yyyy-MM-dd
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

