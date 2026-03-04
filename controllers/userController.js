import User from "../models/user.js";
import bcrypyt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export function createUser(req, res) {

    const passwordHash = bcrypyt.hashSync(req.body.password, 10);

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash
    }

    const user = new User(userData);
    user.save().then(
        () => {
            res.json({
                message: "User created successfully"
            })
        }
    ).catch(
        () => {
            res.json({
                message: "Error creating user"
            })
        }
    )
}

export function loginUser(req, res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email: email
    }).then(
        (user) => {
            if (user == null) {
                res.status(404).json({
                    message: "User not found"
                })

            } else {
                const ispasswordCorrect = bcrypyt.compareSync(password, user.password)
                if (ispasswordCorrect) {

                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isblocked: user.isBlocked,
                        isEmailVerified: user.isEmailVerified,
                        image: user.image
                    }, process.env.jwtSecret, )
                    res.json({
                        message: "Login successful",
                        token: token
                    })
                } else {
                    res.status(403).json({
                        message: "Incorrect password"
                    })
                }
            }
        }
    )
}

export function isAdmin(req, res) {
    if (req.user == null || req.user.role !== "admin") {
        return false
    }
    return true
}