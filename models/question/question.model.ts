const mongoose = require('mongoose');
const pagination = require('mongoose-paginate-v2')

const QuestionSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    mock:{
        type:mongoose.Schema.ObjectId,
        ref:"Mock"
    },

    bundle:{
        type:mongoose.Schema.ObjectId,
        ref:"Bundle"
    },
    created_by:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    question_topic:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    question_status:{
        type:String,
        enum:['not_answered','answered','reviewed_not_answered','not_visited','reviewed_and_answered']
    },
    access_type:{
        type:String,
        enum:['mock_only','answers','single','read_only','multiple','multi_child']
    },
    primary_data:{
        type:String,
        trim:true
    },
    question:{
        type:String,
        trim:true
    },
    multi_language:{
        type:Boolean,
        default:false
    },
    question_view_type:{
        type:String,
        enum:['full','half'],
        default:'half'
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    options:[
        {
            _id:false,
           question_no:Number,
           title:String
        }
    ],
    correct_answer:{
        type:String,
        required:[true,"Answer is required"]
    },
    answer_explanation:{
        type:String,
        trim:true
    },
    user_answer:{
        type:String,
        trim:true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'hard'],
        default: 'easy'
    },
    rating: {
        type: Number,
        default: 0
    },
    negative_points:{
        type:Number,
        default:0
    },
    awarded_points:{
        type:Number,
        default:1,
        required:[true,"Marks are required"]
    },
    question_type:{
        type:String,
        enum:['mcq','tita']
    },
    question_count:{
        type:Number
    },
    question_timer_solo:{
        type:Number
    },
    info:{
        _id:false,
        parent_mock_number:{
            type:Number
        },
        parent_mockId:{
            type:mongoose.Schema.ObjectId,
            ref:'Mock'
        },
        average_time_spent:Number,
        average_time:Number,
        correctly_answered:Number,
        wrongly_answered:Number,
        correct_average_time:Number,
        toppers_average_time:Number,
        unattempted:Number


    },
    
    is_correct:{
        type:Boolean,
    },
    attempted_by:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    child_questions:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Question"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

QuestionSchema.plugin(pagination);


const Question = mongoose.model('Question', QuestionSchema);

export default Question;