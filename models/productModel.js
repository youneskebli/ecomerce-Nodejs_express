const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,['title must be required']],
        minLength:[3,'too short title'],
        trim:true,
        maxLength:[250,'too long title']
    },
    slug:{
        type:String,
        required: true,
        lowercase:true
    },
    description:{
        type:String,
        required:[true,'description must be required'],
        minLength: [20,'too short description']
    },
    quantity:{
        type:Number,
        required:[true,'quantity must be required'],
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'price must be required'],
        trim: true,
        max:[200000,'price must be below 20000']
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'image cover must be required']
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'category must be required']
    },
    subcategories:{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand'
    },
    ratingsAverage:{
        type:Number,
        min:[1,'rate must be equal or above 1.0'],
        max:[5,'rate must be equal or below 1.0']
    },
    ratingsQuantity:{
        type:Number,
        default: 0
    }

},{
    timestamps:true
    }
    )
module.exports = mongoose.model('Product',ProductSchema)