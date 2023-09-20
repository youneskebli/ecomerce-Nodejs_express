const mongoose = require('mongoose')

const CategorySchema
    = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'this field is required'],
        unique:[true,'this field must be unique'],
        minLength:[3,'must be more then 3 characters'],
        maxLength:[25,'must be less then 25 characters']
    },
    slug:{
        type:String,
        lowercase:true,
    },
},
    {timestamps:true}
    );

module.exports = mongoose.model('Category',CategorySchema)

