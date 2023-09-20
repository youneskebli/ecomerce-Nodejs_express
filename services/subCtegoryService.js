const AsyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel')
const slugify = require("slugify");
const ApiError = require('../utils/ApiError')


//set category id to body
exports.setCategoryIdToBody=(req,res,next)=> {
    if (!req.body.category) req.body.category = req.params.categoryId
    next()
}
//@desc create sub category for a specific category
//@route POST /api/subcategories
//@access private
exports.createSubCategory= AsyncHandler(
    async (req,res)=>{
        const {name,category} = req.body
        const subCategory =await SubCategory.create({name,slug:slugify(name),category})
        res.status(201).json({data:subCategory})
    }
)
//@desc get one sub category
//@route GET /api/subcategories/:id
//@access everyone
exports.getOneSubCategory = AsyncHandler(async (req,res,next)=> {
    const {id} = req.params
    const subCategory = await SubCategory.findById(id)
    if (!subCategory) {
      return   next(new ApiError(`subCategory with this id ${id} does not exist`,404))
    }
    res.status(200).json({data:subCategory})
})
// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObject = (req,res,next) => {
    let filterObject = {}
    if (req.params.categoryId) filterObject= {category:req.params.categoryId}
    req.filterObject = filterObject
    next()
}

//@desc get all sub categories
//@route GET /api/subcategories/
//@access everyone
exports.getAllSubCategories = AsyncHandler(async (req,res)=> {
    const page = req.query.page *1 || 1
    const limit = req.query.limit *1 || 5
    const skip = (page-1)*limit
    const subCategories = await SubCategory.find(req.filterObject).limit(limit).skip(skip)// .populate({ path: 'category', select: 'name -_id' });
    res.status(200).json({results:subCategories.length,page,data:subCategories})
})

//@desc update  sub category
//@route Put /api/subcategories/:id
//@access private
exports.updateSubCategory = AsyncHandler(async (req,res,next)=> {
    const {id} = req.params
    const {name,category} = req.body
    const subCategory = await SubCategory.findOneAndUpdate({_id:id}, {name,slug:slugify(name), category},{new:true})
    if (!subCategory) {
      return   next(new ApiError(`subCategory with this id ${id} does not exist`,404))
    }
    res.status(200).json({data:subCategory})
})

//@desc delete  sub category
//@route DELETE /api/subcategories/:id
//@access private
exports.deleteSubCategory = AsyncHandler(async (req,res,next)=> {
    const {id} = req.params
    const subCategory = await SubCategory.findOneAndDelete({_id:id})
    if (!subCategory) {
        return   next(new ApiError(`subCategory with this id ${id} does not exist`,404))
    }
    res.status(204).send()
})