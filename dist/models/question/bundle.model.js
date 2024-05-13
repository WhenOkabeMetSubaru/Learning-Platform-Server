"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const BundleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sno: {
        type: Number
    },
    description: {
        type: String
    },
    section_start_time: {
        type: Date
    },
    section_end_time: {
        type: Date
    },
    section_timer: {
        type: Number
    },
    total_questions: {
        type: Number,
        default: 0
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    mock: {
        type: mongoose.Schema.ObjectId,
        ref: "Mock"
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    is_submitted: {
        type: Boolean,
        default: false
    },
    difficulty: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Bundle = mongoose.model('Bundle', BundleSchema);
exports.default = Bundle;
