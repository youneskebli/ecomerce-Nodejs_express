const AsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const ApiError = require('../utils/ApiError')
const slugify = require("slugify");

// @desc get all products
//@route GET /api/v1/products
//access everyone
exports.getAllProducts=AsyncHandler(async (req,res)=>{
    const page = req.query.page *1 || 1 ;
    const limit = req.query.limit * 1 || 5 ;
    const skip = (page-1)*limit
    const products = await Product.find().limit(limit).skip(skip)
    res.status(200).json({results:products.length,page,data:products})
})

// @desc get one product
//@route GET /api/v1/products/:id
//access everyone
exports.getOneProduct=AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    if (!product) {
        return next(new ApiError(`product with this id:${id} does not exist`,404))
    }
    res.status(200).json({data:product})
})

// @desc create one product
//@route POST /api/v1/products/
//access private
exports.createProduct=AsyncHandler(async (req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    const product = await Product.create(req.body)
    res.status(201).json({data:product})
})

// @desc update one product
//@route PUT /api/v1/products/:id
//access private
exports.updateProduct=AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    req.body.slug=slugify(req.body.title)
    const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    if (!product) {
        return next(new ApiError(`product with this id:${id} does not exist`,404))
    }
    res.status(200).json({data:product})
})

// @desc delte  product
//@route PUT /api/v1/products/:id
//access private
exports.deleteProduct=AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const product = await Product.findOneAndDelete(id)
    if (!product) {
        return next(new ApiError(`product with this id:${id} does not exist`,404))
    }
    res.status(204).send()
})