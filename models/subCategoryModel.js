const mongoose = require('mongoose')
const slugify = require("slugify");

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'subcategory name must be unique'],
        trim:true,
        minLength:[3,'too short subcategory name'],
        maxLength:[25,'too long subcategory name']
    },
    slug:{
        type:String,
        lowercase: true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'SubCategory must be belong to parent category']
    }
},{timestamps:true})

module.exports= mongoose.model('SubCategory',subCategorySchema)