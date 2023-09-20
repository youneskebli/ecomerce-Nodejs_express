const express= require('express')
const {getAllBrands, createBrand, getOneBrand, updateBrand, deleteBrand} = require("../services/brandService");
const {createBrandValidator, getOneBrandValidator, updateBrandValidator, deleteBrandValidator} = require("../utils/validators/brandValidator");
const router= express.Router()

router.route('/').get(getAllBrands).post(createBrandValidator,createBrand)
router.route('/:id').get(getOneBrandValidator,getOneBrand).put(updateBrandValidator,updateBrand).delete(deleteBrandValidator,deleteBrand)

module.exports = router