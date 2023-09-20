const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatormMdlleware')

exports.createSubCategoryValidator = [
    check('name').notEmpty().withMessage('must be not empty')
        .isLength({min:3}).withMessage('too short name')
        .isLength({max:25}).withMessage('too long name'),
    validatorMiddleware
]

exports.getOneSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]