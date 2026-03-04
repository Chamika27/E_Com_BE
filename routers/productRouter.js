import express from "express";
import { createProduct, updateProduct } from "../controllers/productController.js";
import { getProducts } from "../controllers/productController.js";
import { getProductByID } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:productID', getProductByID);
productRouter.delete('/:productID', deleteProduct);
productRouter.put('/:productID', updateProduct);

export default productRouter;