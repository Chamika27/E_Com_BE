import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: "Not provided"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "customer",
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
    },
})

const User = mongoose.model("users", userSchema)

export default User;