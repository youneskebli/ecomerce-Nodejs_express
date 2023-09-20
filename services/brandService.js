const AsyncHandler = require('express-async-handler')
const Brand  =require('../models/brandModel');
const ApiError = require('../utils/ApiError')
const slugify = require("slugify");
// @ desc get all brands
// @route GET /api/v1/brands
// @access everyone
exports.getAllBrands = AsyncHandler(async (req,res)=>{
    const  page = req.query.page *1|| 1;
    const limit = req.query.limit *1 || 5;
    const skip = (page-1)*limit

    const brands = await Brand.find().limit(limit).skip(skip)
    res.status(200).json({results:brands.length,page,data:brands})
})

// @ desc get one brand
// @route GET /api/v1/brands/:id
// @access everyone
exports.getOneBrand = AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const brand = await Brand.findById(id)
    if (!brand){
       return  next( new ApiError(`brand with this id :${id} does not exist`,404))
    }
    res.status(200).json({data:brand})
})

// @ desc create  brand
// @route POST /api/v1/brands/
// @access private
exports.createBrand = AsyncHandler(async (req,res)=>{
    const {name} = req.body
    const brand = await Brand.create({name,slug:slugify(name)})
    res.status(201).json({data:brand})
})

// @ desc update  brand
// @route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    const brand = await Brand.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
    if (!brand) {
      return  next(new ApiError(`brand with this id :${id} does not exist`,404))
    }
    res.status(200).json({data:brand})
})


// @ desc delte  brand
// @route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = AsyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const brand = await Brand.findOneAndDelete(id)
    if (!brand) {
      return   next(new ApiError(`brand with this id :${id} does not exist`,404))
    }
    res.status(204).send()
})