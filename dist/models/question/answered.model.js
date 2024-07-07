"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const AnsweredSchema = new mongoose.Schema({
    total_questions: {
        type: Number
    },
    total_correct_answers: {
        type: Number
    },
    total_incorrect_answer: {
        type: Number
    },
    total_attempts: {
        type: Number
    },
    unattempted_questions: {
        type: Number
    },
    total_marks: {
        type: Number
    },
    negative_marks: {
        type: Number
    },
    percentile: {
        type: Number
    },
    bundle: {
        type: mongoose.Schema.ObjectId,
        ref: "Bundle"
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
const Answered = mongoose.model('Answered', AnsweredSchema);
exports.default = Answered;
