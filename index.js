import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


const app = express()


app.use(bodyParser.json())


app.use(
    (req, res, next) => {
        const value = req.header("Authorization")
        if (value != null) {
            const token = value.replace("Bearer ", "")
            jwt.verify(token, process.env.jwtSecret,
                (err, decoded) => {
                    if (decoded == null) {
                        res.status(403

                        ).json({
                            message: "Unauthorized"
                        })
                    } else {
                        req.user = decoded
                        next()
                    }

                }
            )
        } else {
            next()
        }

    }
)


const connectionString = process.env.MONGODB


mongoose.connect(connectionString).then(
    () => {
        console.log('Connected to mongoDB')
    }
).catch(
    () => {
        console.log('Error connecting to mongoDB')
    }
)




app.use('/Users', userRouter)
app.use('/Products', productRouter)



app.listen(5000,
    () => {
        console.log('Server started on port 5000')
    })