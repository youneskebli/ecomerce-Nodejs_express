const mongoose = require('mongoose')


const BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'this field must be unique'],
        required:[true,'this field must be required'],
        minLength:[3,'too short name'],
        maxLength:[25,'too long name']
    },
    slug:{
        type:String,
        lowercase:true
    },
},{timestamps:true})

module.exports = mongoose.model('Brand',BrandSchema)