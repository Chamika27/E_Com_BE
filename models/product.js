import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    alternativeNames: {
        type: [String],
        default: []
    },
    lablledPrice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        default: ["/default-product-image.png"]
    },
    description: {
        type: String,
        required: true,
        default: "No description provided"
    },
    category: {
        type: String,
        required: true,
        default: "Not provided"
    },
    stock: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model("products", productSchema)

export default Product;