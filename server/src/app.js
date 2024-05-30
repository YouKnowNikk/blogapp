import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))
app.use(express.json({limit:'20kb'}))
app.use(express.urlencoded({extended:true,limit:'20kb'}))
app.use(express.static("public"));
app.use(cookieParser())


// Import Routes

import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'


app.use("/users",userRouter)
app.use("/blogapp",blogRouter)
export {app}