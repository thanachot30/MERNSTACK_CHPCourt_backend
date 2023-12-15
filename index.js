import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mysql from 'mysql2'
import memberRouter from './routes/member.route.js'
import bookingRouter from './routes/booking.route.js'
dotenv.config();

const app = express();
const port = 8000;
//midleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/member',memberRouter)
app.use('/api/booking',bookingRouter)




//mysql connect
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

//error handle
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})



app.listen(port,()=>{
    console.log(`Server is runing on port ${port} !!!`)
});




