"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuestionsByPageAndFilter = exports.updateQuestionStatusForMock = exports.updateQuestionByID = exports.getQuestionDetails = exports.getAllQuestionsHomePage = exports.getQuestionAccess = exports.getAllQuestions = exports.getAllQuestionsByBundle = exports.getAllQuestionsByMock = exports.getAllAttemptedQuestionsByUser = exports.getAllQuestionsByUser = exports.getQuestionByID = exports.addNewQuestionToMock = exports.addNewQuestionByUser = void 0;
const question_model_1 = __importDefault(require("../models/question/question.model"));
const bundle_model_1 = __importDefault(require("../models/question/bundle.model"));
const addNewQuestionByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = req.body;
        let parentId;
        if (questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.parentId) {
            parentId = questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.parentId;
            questionDetails === null || questionDetails === void 0 ? true : delete questionDetails.parentId;
        }
        questionDetails.created_by = req.user._id;
        if (questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.bundle) {
            let bundleDetails = yield bundle_model_1.default.findById({ _id: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.bundle });
            questionDetails.question_count = (bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.total_questions) + 1;
        }
        let questionCreate = new question_model_1.default(questionDetails);
        let finalQuestion = yield questionCreate.save();
        if (parentId && (questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.access_type) == "multi_child") {
            let parentDetails = yield question_model_1.default.findByIdAndUpdate({ _id: parentId }, {
                $push: {
                    child_questions: finalQuestion === null || finalQuestion === void 0 ? void 0 : finalQuestion._id
                }
            });
        }
        if (questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.bundle) {
            let updatedBundle = yield bundle_model_1.default.findByIdAndUpdate({ _id: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.bundle }, {
                $inc: {
                    total_questions: 1
                }
            });
        }
        let finalOutput = {
            status: false,
            info: "Question Created Successfully",
            data: finalQuestion
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: true,
            info: "Unable to create question for some unknown reason"
        });
    }
});
exports.addNewQuestionByUser = addNewQuestionByUser;
const addNewQuestionToMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = req.body;
        let questionCreate = new question_model_1.default(questionDetails);
        let finalQuestion = yield questionCreate.save();
        let finalOutput = {
            status: false,
            info: "Question Created Successfully",
            data: finalQuestion
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create question for some unknown reason"
        });
    }
});
exports.addNewQuestionToMock = addNewQuestionToMock;
const getQuestionByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.findById({ _id: req.params.questionId });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Question not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "question Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        });
    }
});
exports.getQuestionByID = getQuestionByID;
const getAllQuestionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({ created_by: req.user._id, access_type: { $in: ["single", "read_only", "multiple"] } }).sort({ "createdAt": -1 });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllQuestionsByUser = getAllQuestionsByUser;
const getAllAttemptedQuestionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({ created_by: req.user._id, access_type: { $in: ["answers_non_mock", "multiple_non_mock"] } });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllAttemptedQuestionsByUser = getAllAttemptedQuestionsByUser;
const getAllQuestionsByMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({ mock: req.params.mockId });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllQuestionsByMock = getAllQuestionsByMock;
const getAllQuestionsByBundle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({ bundle: req.params.bundleId, access_type: "mock_only" });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Question Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllQuestionsByBundle = getAllQuestionsByBundle;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({});
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllQuestions = getAllQuestions;
const getQuestionAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let questionData = [];
        let questionExists = yield question_model_1.default.findOne({ testId: req.params.questionId, created_by: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, access_type: { $in: ["answers_non_mock", "multiple_non_mock"] } });
        if (questionExists) {
            questionData.push(questionExists);
            if (questionExists.access_type == 'multiple') {
                let childQuestions = yield question_model_1.default.find({ access_type: "multi_child", _id: { $in: questionExists === null || questionExists === void 0 ? void 0 : questionExists.child_questions } });
                if ((childQuestions === null || childQuestions === void 0 ? void 0 : childQuestions.length) > 0) {
                    questionData = [...questionData, ...childQuestions];
                }
            }
            return res.status(200).json({
                status: false,
                info: "Success Data Retrieved",
                data: questionData
            });
        }
        let questionDetails = yield question_model_1.default.findById({ _id: req.params.questionId });
        if (questionDetails.access_type == 'read_only') {
            return res.status(400).json({
                status: true,
                info: "Not Valid Question"
            });
        }
        if ((questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.access_type) == 'single') {
            let questionObj = {
                options: questionDetails.options,
                correct_answer: questionDetails.correct_answer,
                question_topic: questionDetails.question_topic,
                question_view_type: questionDetails.question_view_type,
                category: questionDetails.category,
                awarded_points: questionDetails.awarded_points,
                negative_points: questionDetails.negative_points,
                question_type: questionDetails.question_type,
                difficulty: questionDetails.difficulty,
                question_timer_solo: questionDetails.question_timer_solo,
                question: questionDetails.question,
                answer_explanation: questionDetails.answer_explanation,
                primary_data: questionDetails.primary_data,
                testId: questionDetails._id,
                question_count: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.question_count,
                access_type: 'answers_non_mock',
                question_status: "not_visited",
                created_by: req.user._id
            };
            let questionCreate = new question_model_1.default(questionObj);
            let finalResult = yield questionCreate.save();
            questionData.push(finalResult);
        }
        else if ((questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.access_type) == 'multiple') {
            let questionObj = {
                options: questionDetails.options,
                correct_answer: questionDetails.correct_answer,
                question_topic: questionDetails.question_topic,
                question_view_type: questionDetails.question_view_type,
                category: questionDetails.category,
                awarded_points: questionDetails.awarded_points,
                negative_points: questionDetails.negative_points,
                question_type: questionDetails.question_type,
                difficulty: questionDetails.difficulty,
                question_timer_solo: questionDetails.question_timer_solo,
                question: questionDetails.question,
                answer_explanation: questionDetails.answer_explanation,
                primary_data: questionDetails.primary_data,
                testId: questionDetails._id,
                question_count: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.question_count,
                access_type: 'multiple_non_mock',
                question_status: "not_visited",
                created_by: req.user._id
            };
            let questionCreate = new question_model_1.default(questionObj);
            let parentFinalResult = yield questionCreate.save();
            questionData.push(parentFinalResult);
            let childQuestions = yield question_model_1.default.find({ access_type: "multi_child", _id: { $in: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.child_questions } });
            let newQuestions = childQuestions === null || childQuestions === void 0 ? void 0 : childQuestions.map((item, num) => {
                return {
                    options: item.options,
                    correct_answer: item.correct_answer,
                    question_topic: item.question_topic,
                    question_view_type: item.question_view_type,
                    category: item.category,
                    awarded_points: item.awarded_points,
                    negative_points: item.negative_points,
                    question_type: item.question_type,
                    difficulty: item.difficulty,
                    question_timer_solo: item === null || item === void 0 ? void 0 : item.question_timer_solo,
                    question: item === null || item === void 0 ? void 0 : item.question,
                    answer_explanation: item === null || item === void 0 ? void 0 : item.answer_explanation,
                    primary_data: item === null || item === void 0 ? void 0 : item.primary_data,
                    question_count: item === null || item === void 0 ? void 0 : item.question_count,
                    access_type: 'multi_child',
                    question_status: "not_visited",
                    created_by: req.user._id,
                    testId: item._id,
                };
            });
            for (let i = 0; i < (newQuestions === null || newQuestions === void 0 ? void 0 : newQuestions.length); i++) {
                let newData = new question_model_1.default(newQuestions[i]);
                let result = yield (newData === null || newData === void 0 ? void 0 : newData.save());
                let parentDetails = yield question_model_1.default.findByIdAndUpdate({ _id: parentFinalResult._id }, {
                    $push: {
                        child_questions: result === null || result === void 0 ? void 0 : result._id
                    }
                });
                questionData.push(result);
            }
        }
        let finalOutput = {
            status: false,
            info: "Question Created for User",
            data: questionData
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch question details for  unknown reason'
        });
    }
});
exports.getQuestionAccess = getQuestionAccess;
const getAllQuestionsHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionDetails = yield question_model_1.default.find({ access_type: { $in: ["multiple", "single", "read_only"] } }).sort({ "createdAt": -1 });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getAllQuestionsHomePage = getAllQuestionsHomePage;
const getQuestionDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questionData = [];
        let questionDetails = yield question_model_1.default.findById({ _id: req.params.questionId });
        questionData === null || questionData === void 0 ? void 0 : questionData.push(questionDetails);
        if (questionDetails.access_type == 'multiple' || questionDetails.access_type == 'multiple_non_mock') {
            let childQuestions = yield question_model_1.default.find({ access_type: "multi_child", _id: { $in: questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.child_questions } });
            if ((childQuestions === null || childQuestions === void 0 ? void 0 : childQuestions.length) > 0) {
                questionData = [...questionData, ...childQuestions];
            }
        }
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Questions not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Questions Found",
            data: questionData
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch questions for some  unknown reason'
        });
    }
});
exports.getQuestionDetails = getQuestionDetails;
const updateQuestionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        let questionVerify = yield question_model_1.default.findById({ _id: req.params.mockId });
        if (questionVerify.created_by !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            });
        }
        let questionDetails = yield question_model_1.default.findByIdAndUpdate({ _id: (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.questionId }, req.body, { new: true });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'Question updated',
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not update question information for some unknown reason'
        });
    }
});
exports.updateQuestionByID = updateQuestionByID;
const updateQuestionStatusForMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        let questionData = yield question_model_1.default.findById({ _id: req.params.questionId });
        let updateObj = {
            question_status: req.body.question_status
        };
        if (req.body.user_answer !== '') {
            if (req.body.question_status == 'reviewed_and_answered' && (questionData === null || questionData === void 0 ? void 0 : questionData.question_status) == 'reviewed_not_answered') {
                updateObj = Object.assign(Object.assign({}, updateObj), { user_answer: req.body.user_answer, question_status: 'answered' });
            }
            else if (req.body.question_status == 'reviewed_and_answered' && (questionData === null || questionData === void 0 ? void 0 : questionData.question_status) !== 'reviewed_not_answered') {
                updateObj = Object.assign(Object.assign({}, updateObj), { user_answer: req.body.user_answer, question_status: 'reviewed_and_answered' });
            }
            else {
                updateObj = Object.assign(Object.assign({}, updateObj), { user_answer: req.body.user_answer });
            }
        }
        else if ((req.body.question_status == 'reviewed_and_answered' || req.body.question_status == "reviewed_not_answered") && (!req.body.user_answer || req.body.user_answer == '')) {
            updateObj = Object.assign(Object.assign({}, updateObj), { user_answer: "" });
        }
        else if (req.body.question_status == 'not_answered' && req.body.user_answer == '') {
            updateObj = Object.assign(Object.assign({}, updateObj), { user_answer: "" });
        }
        let questionDetails = yield question_model_1.default.findByIdAndUpdate({ _id: (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.questionId }, updateObj, { new: true });
        if (!questionDetails) {
            return res.status(404).json({
                status: true,
                info: "Could not update"
            });
        }
        let finalOutput = {
            status: false,
            info: 'Question updated',
            data: questionDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not update question information for some unknown reason'
        });
    }
});
exports.updateQuestionStatusForMock = updateQuestionStatusForMock;
const getAllQuestionsByPageAndFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        let params = req.query;
        let query = {
            access_type: ["single", "read_only", "multiple"]
        };
        let options = {
            page: (params === null || params === void 0 ? void 0 : params.pageNumber) || 1,
            limit: (params === null || params === void 0 ? void 0 : params.pageSize) || 10,
            sort: {
                'createdAt': (params === null || params === void 0 ? void 0 : params.sort) || -1
            }
        };
        let questionDetails = yield question_model_1.default.paginate(query, options);
        if (((_e = questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.docs) === null || _e === void 0 ? void 0 : _e.length) < 1) {
            return res.status(404).json({
                status: true,
                info: "Not Found"
            });
        }
        return res.status(200).json({
            status: false,
            info: "Found the Data",
            data: questionDetails.docs,
            totalDocs: questionDetails.totalDocs,
            limit: questionDetails.limit,
            totalPages: questionDetails.totalPages,
            page: questionDetails.page
        });
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: error.message
        });
    }
});
exports.getAllQuestionsByPageAndFilter = getAllQuestionsByPageAndFilter;
