const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        trim:true
    },
    parent_category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    category_type:{
        type:String,
        enum:['parent','child']

    },
    
})


const Category = mongoose.model('Category', CategorySchema);

export default Category;