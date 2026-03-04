import Product from '../models/product.js';
import { isAdmin } from './userController.js';


export async function createProduct(req, res) {

    if (isAdmin(req, res) === false) {
        return res.status(403).json({
            message: "Access denied. Admins only."
        })
    }

    const product = new Product(req.body)

    try {
        const response = await product.save()

        res.json({
            message: "Product created successfully",
            product: response
        })

    } catch (error) {
        console.error("Error creating product: ", error)
        res.status(500).json({
            message: "Error creating product"
        })
    }
}

export async function getProducts(req, res) {
    try {
        if (isAdmin(req)) {
            const products = await Product.find()
            res.json(products)
        } else {
            const products = await Product.find({ isAvailable: true })
            return res.json(products)
        }

    } catch (error) {
        console.error("Error fetching products: ", error)
        res.status(500).json({
            message: "Error fetching products"
        })
    }
}

export async function deleteProduct(req, res) {
    try {
        if (isAdmin(req)) {
            const productID = req.params.productID
            const deletedProduct = await Product.findOneAndDelete({ productID: productID })
            if (deletedProduct) {
                res.json({
                    message: "Product deleted successfully",
                    product: deletedProduct
                })
            } else {
                res.status(404).json({
                    message: "Product not found"
                })
            }
        } else {
            res.status(403).json({
                message: "Access denied. Admins only."
            })
        }

    } catch (error) {
        console.error("Error deleting product: ", error)
        res.status(500).json({
            message: "Error deleting product"
        })
    }
}

export async function updateProduct(req, res) {
    try {
        if (isAdmin(req)) {
            const productID = req.params.productID
            const data = req.body
            data.productID = productID
            const updatedProduct = await Product.findOneAndUpdate({ productID: productID },
                req.body, { new: true }
            )
            if (updatedProduct) {
                res.json({
                    message: "Product updated successfully",
                    product: updatedProduct
                })
            } else {
                res.status(404).json({
                    message: "Product not found"
                })
            }
        } else {
            res.status(403).json({
                message: "Access denied. Admins only."
            })
        }
    } catch (error) {
        console.error("Error updating product: ", error)
        res.status(500).json({
            message: "Error updating product"
        })
    }
}

export async function getProductByID(productID) {
    try {
        if (isAdmin(req)) {
            const product = await Product.findOne({ productID: productID, isAvailable: true })
            return product
        } else {
            res.status(403).json({
                message: "Access denied. Admins only."
            })
        }

    } catch (error) {
        console.error("Error fetching product by ID: ", error)
        res.status(500).json({
            message: "Error fetching product by ID"
        })
    }
}