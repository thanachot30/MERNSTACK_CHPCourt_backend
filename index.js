import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = 3000;

import userRouter from "./routes/user.route.js"

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

app.use('/api/user',userRouter);
