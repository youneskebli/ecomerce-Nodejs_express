const express = require('express')
const {createSubCategory, getOneSubCategory, getAllSubCategories, updateSubCategory, deleteSubCategory,
    createFilterObject, setCategoryIdToBody
} = require('../services/subCtegoryService')
const {createSubCategoryValidator, getOneSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator} = require("../utils/validators/subCtegoryValidator");
const Router = express.Router({mergeParams:true})



Router.route('/').get(createFilterObject,getAllSubCategories).post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory)
Router.route('/:id').get(getOneSubCategoryValidator,getOneSubCategory).put(updateSubCategoryValidator,updateSubCategory).delete(deleteSubCategoryValidator,deleteSubCategory)
module.exports=Router