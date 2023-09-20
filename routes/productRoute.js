const express = require('express')
const {getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct} = require("../services/productService");
const {createProductValidator, getOneProductValidator, updateProductValidator, deleteProductValidator} = require("../utils/validators/productValidator");


const Router = express.Router()

Router.route('/').get(getAllProducts).post(createProductValidator,createProduct)
Router.route('/:id').get(getOneProductValidator,getOneProduct).put(updateProductValidator,updateProduct).delete(deleteProductValidator,deleteProduct)

module.exports= Router