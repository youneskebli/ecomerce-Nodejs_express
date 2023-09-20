const CategoryModel = require("../models/CategoryModel");
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
//@desc get all categories
//@route GET /api/v2/categories
//@access  everyone
exports.getCategories=asyncHandler(async (req,res)=>{
    const page= req.query.page *1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page-1)*limit;
    const categories= await CategoryModel.find().limit(limit).skip(skip);
    res.status(200).json({results:categories.length,page,data:categories})
})

//@desc get one category
//@route Get /api/v1/category/:id
//@access everyone
exports.getOneCategory=asyncHandler(async (req,res,next)=> {
    const {id} = req.params
    const category = await CategoryModel.findById(id)
    if (!category) {
        return next(new ApiError(`category with this id ${id} does not exist`,404))
    }
    res.status(200).json({data:category})
})

//@desc create category
//@route POST /api/v2/categories
//@access private
exports.createCategory=asyncHandler(async (req,res)=> {
    const name = req.body.name
    const category = await CategoryModel.create({name,slug:slugify(name)})
    res.status(201).json({data:category})
})

//@desc update category
//@route PUT /api/v1/categories/:id
//@access private
exports.updateCategory=asyncHandler(async (req,res,next)=>{
    const {id} = req.params
    const {name} = req.body
    const category = await CategoryModel.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
    if (!category){
        return next(new ApiError(`category with this id ${id} does not exist`,404))
    }
    res.status(200).json({data:category})
})

//@desc delete category
//@route PUT /api/v1/categories/:id
//@access private
exports.deleteCategory=asyncHandler(async (req,res,next)=> {
        const {id} = req.params
        const category = await CategoryModel.findOneAndDelete({_id: id})
        if (!category) {
            return next(new ApiError(`category with this id ${id} does not exist`,404))
        }
        res.status(204).send()
    }
)