"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const AnsweredSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question"
    },
    user_answer: {
        type: String
    },
    question_status: {
        type: String,
        enum: ["wrong", "correct", "unattempted"],
        default: "unattempted"
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
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
