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
exports.getAllQuestionsByPageAndFilter = exports.updateQuestionStatusForMock = exports.updateQuestionByID = exports.getQuestionDetails = exports.getAllQuestionsHomePage = exports.getAllQuestions = exports.getAllQuestionsByBundle = exports.getAllQuestionsByMock = exports.getAllAttemptedQuestionsByUser = exports.getAllQuestionsByUser = exports.getQuestionByID = exports.addNewQuestionToMock = exports.addNewQuestionByUser = void 0;
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
        let mockDetails = yield question_model_1.default.findById({ _id: req.params.mockId });
        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: mockDetails
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
        let questionDetails = yield question_model_1.default.find({ attempted_by: req.user._id });
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
        if (questionDetails.access_type == 'multiple') {
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
    var _a, _b;
    try {
        let questionVerify = yield question_model_1.default.findById({ _id: req.params.mockId });
        if (questionVerify.created_by !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            });
        }
        let questionDetails = yield question_model_1.default.findByIdAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.questionId }, req.body, { new: true });
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
    var _c;
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
        let questionDetails = yield question_model_1.default.findByIdAndUpdate({ _id: (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.questionId }, updateObj, { new: true });
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
    var _d;
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
        if (((_d = questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.docs) === null || _d === void 0 ? void 0 : _d.length) < 1) {
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
