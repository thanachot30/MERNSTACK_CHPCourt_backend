import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = 3000;

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"


app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


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




