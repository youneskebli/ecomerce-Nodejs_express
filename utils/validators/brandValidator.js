const validatorMiddleware = require('../../middlewares/validatormMdlleware')
const {check} = require('express-validator')

exports.createBrandValidator = [
    check('name').notEmpty().withMessage('name must be required')
        .isLength({min:3}).withMessage('too short brand name')
        .isLength({max:25}).withMessage(('too long brand name')),
    validatorMiddleware
]

exports.getOneBrandValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
        ]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('invalid id format'),
    validatorMiddleware
]

