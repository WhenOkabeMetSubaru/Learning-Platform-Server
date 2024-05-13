const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    parent_category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    child_category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    category_type:{
        type:String,
        enum:['main','sub','child']

    },
    
})


const Category = mongoose.model('Category', CategorySchema);

export default Category;