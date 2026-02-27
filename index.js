import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRouter from './routers/userRouter.js'
import jwt from "jsonwebtoken";


const app = express()


app.use(bodyParser.json())


app.use(
    (req, res, next) => {
        const value = req.header("Authorization")
        if (value != null) {
            const token = value.replace("Bearer ", "")
            jwt.verify(token, "abc-123",
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


const connectionString = "mongodb+srv://admin:123@cluster0.lrtsef9.mongodb.net/?appName=Cluster0"


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


app.listen(5000,
    () => {
        console.log('Server started on port 5000')
    })


// add comment