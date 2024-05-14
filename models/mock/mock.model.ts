const mongoose = require('mongoose');
const pagination = require("mongoose-paginate-v2")


const MockSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    sections:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Bundle"
        }
    ],
    mock_type:{
        type:String,
        enum:['test','paper'],
        default:'paper'
    },
    total_mock_length:{
        type:Number
    },
    is_sectional_locked:{
        type:Boolean,
        default:true
    },
    categories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ],
    completion_status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    },
    total_questions: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'hard'],
        default: 'easy'
    },
    user_difficulty_response:{
        easy:{
            type:Number
        },
        moderate:{
            type:Number
        },
        hard:{
            type:Number
        }
    },
    rating: {
        type: Number,
        default: 0
    },
    mock_start_timing: {
        type: Date,
    },
    mock_end_timing: {
        type: Date
    },
    mock_pause_timing: {
        type: Date
    },
    is_mock_completed_by_user: {
        type: Boolean,
        default: false
    },
    answered_correctly: {
        type: Number
    },
    unattempted_questions: {
        type: Number
    },
    wrong_questions: {
        type: Number
    },
    total_score: {
        type: Number
    },
    overall_percentile: {
        type: Number
    },
    created_by:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    testId:{
        type:mongoose.Schema.ObjectId,
        ref:"Mock"
    },
    sectional_score: [
        {
            _id: false,
            section_type: {
                type: mongoose.Schema.ObjectId,
                ref: "Category"
            },
            correct:Number,
            wrong:Number,
            unattempted:Number,
            percentile:Number,
            score:Number

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

MockSchema.plugin(pagination)


const Mock = mongoose.model('Mock', MockSchema);

export default Mock;