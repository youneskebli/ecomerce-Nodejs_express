const express = require('express')
const {createCategory, getCategories, getOneCategory, updateCategory, deleteCategory} = require("../services/CategoryService");
const {getOneCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}= require('../utils/validators/categoryValidator')
const router = express.Router()
const subCategoryRoute = require('../routes/subCategoryRoute')

router.use('/:categoryId/subcategories',subCategoryRoute)
router.route('/')
    .get(getCategories)
    .post(createCategoryValidator,createCategory)
router.route('/:id')
    .get(getOneCategoryValidator,getOneCategory)
    .put(updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,deleteCategory)

module.exports = router