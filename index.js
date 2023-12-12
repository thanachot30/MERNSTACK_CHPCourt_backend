import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})


mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB?');
})
.catch((err)=>{
    console.log(err);
});

app.listen(port,()=>{
    console.log(`Server is runing on port ${port} !!!`)
})




