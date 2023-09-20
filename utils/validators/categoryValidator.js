const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatormMdlleware')

exports.getOneCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('this field is required')
        .isLength({min:3}).withMessage('at least 3 characters')
        .isLength({max:25}).withMessage('must be less then 25 characters'),
    validatorMiddleware
]


exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]