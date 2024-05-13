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
exports.getAllMocksByPageAndFilter = exports.updateMockBundleNextStatus = exports.updateMockBundleSubmit = exports.getAllDetailsAboutMock = exports.getMockAccess = exports.getAllMocks = exports.updateMockByID = exports.getPendingMockByUser = exports.getAllMocksByUser = exports.getMockByID = exports.addNewMockByUser = void 0;
const mock_model_1 = __importDefault(require("../models/mock/mock.model"));
const user_model_1 = __importDefault(require("../models/user/user.model"));
const bundle_model_1 = __importDefault(require("../models/question/bundle.model"));
const question_model_1 = __importDefault(require("../models/question/question.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const addNewMockByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mockDetails = req.body;
    mockDetails.created_by = req.user._id;
    let checkExists = yield mock_model_1.default.findOne({ completion_status: "pending" });
    if (checkExists) {
        return {
            status: true,
            info: "Already Exists",
            data: checkExists
        };
    }
    let mockCreate = new mock_model_1.default(mockDetails);
    let finalMock = yield mockCreate.save();
    let finalOutput = {
        status: false,
        info: "Mock Created Successfully",
        data: finalMock
    };
    return res.status(200).json(finalOutput);
});
exports.addNewMockByUser = addNewMockByUser;
const getMockByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield user_model_1.default.findById({ _id: req.params.mockId });
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
exports.getMockByID = getMockByID;
const getAllMocksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield mock_model_1.default.find({ created_by: req.user._id, completion_status: 'completed', mock_type: "paper" }).sort({ 'createdAt': -1 });
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
            info: 'Could not fetch user  unknown reason'
        });
    }
});
exports.getAllMocksByUser = getAllMocksByUser;
const getPendingMockByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield mock_model_1.default.findOne({ created_by: req.user._id, completion_status: 'pending' });
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
        console.log(error.message);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        });
    }
});
exports.getPendingMockByUser = getPendingMockByUser;
const updateMockByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let mockVerify = yield mock_model_1.default.findById({ _id: req.params.mockId });
        if (((_a = mockVerify.created_by) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_c = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString())) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            });
        }
        let mockDetails = yield mock_model_1.default.findByIdAndUpdate({ _id: (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.mockId }, req.body, { new: true });
        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'Mock updated',
            data: mockDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not update mock information for some unknown reason'
        });
    }
});
exports.updateMockByID = updateMockByID;
const getAllMocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield mock_model_1.default.find({ mock_type: "paper" });
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
            info: 'Could not fetch mock details for  unknown reason'
        });
    }
});
exports.getAllMocks = getAllMocks;
const getMockAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        let mockExists = yield mock_model_1.default.findOne({ testId: req.params.mockId, created_by: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id, mock_type: "test" });
        if (mockExists) {
            return res.status(200).json({
                status: false,
                info: "Mock Found",
                data: mockExists
            });
        }
        let mockDetails = yield mock_model_1.default.findById({ _id: req.params.mockId });
        let start_time = new Date();
        let end_time = new Date();
        end_time.setHours(end_time.getHours() + 1);
        let mockObj = {
            created_by: req.user._id,
            testId: req.params.mockId,
            mock_type: 'test',
            mock_start_time: start_time,
            mock_end_time: end_time
        };
        let mockCreate = new mock_model_1.default(mockObj);
        let finalResult = yield mockCreate.save();
        let bundleDetails = yield bundle_model_1.default.find({ mock: req.params.mockId }).sort({ 'created': -1 });
        // let bundleTimer = bundleDetails?.map((item: any, i: number) => {
        //     let time1 = new Date();
        //     let time2 = new Date();
        //     // return {
        //     //     _id: item?._id,
        //     //     section_start_time: time1.setSeconds(time1.getSeconds() + (i * 10)),
        //     //     section_end_time: time2.setSeconds(time2.getSeconds() + (i + 1) * 10)
        //     // }
        //     return {
        //         _id: item?._id,
        //         section_start_time: time1.setMinutes(time1.getMinutes() + (i * 1)),
        //         section_end_time: time2.setMinutes(time2.getMinutes() + (i + 1) * 1)
        //     }
        // })
        let bundleIDArr = bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.map((item) => {
            return new ObjectId(item === null || item === void 0 ? void 0 : item._id);
        });
        let questionDetails = yield question_model_1.default.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    }
                }
            }
        ]);
        let newQuestions = questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.map((item) => {
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
                question_timer_solo: item.question_timer_solo,
                question: item.question,
                answer_explanation: item.answer_explanation,
                primary_data: item.primary_data,
                bundle: item.bundle,
                question_count: item === null || item === void 0 ? void 0 : item.question_count,
                access_type: 'answers',
                question_status: "not_visited"
            };
        });
        let createdQuestions = yield question_model_1.default.insertMany(newQuestions);
        let finalOutput = {
            status: false,
            info: "Mock created for User",
            data: finalResult
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        });
    }
});
exports.getMockAccess = getMockAccess;
const getAllDetailsAboutMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        let mockDetails = yield mock_model_1.default.findById({ _id: req.params.mockId });
        // let bundleUpdate = await Bundle.updateMany({ mock: mockDetails?.testId }, {
        //     $set: {
        //         is_submitted: false
        //     }
        // })
        let questionUpdate = yield question_model_1.default.updateMany({ access_type: 'answers' }, { question_status: "not_visited" });
        let bundleDetails = yield bundle_model_1.default.find({ mock: mockDetails === null || mockDetails === void 0 ? void 0 : mockDetails.testId }).sort({ 'created': -1 });
        // let bundleTimer = bundleDetails?.map((item:any,i:number)=>{
        //     let time1  = new Date();
        //     let time2 = new Date();
        // return {
        //     _id:item?._id,
        //     section_start_time:"",
        //     section_end_time:""
        // }
        // })
        // for(let i = 0;i<bundleTimer?.length;i++){
        //     let bundleUpdate = await Bundle.findByIdAndUpdate({_id:bundleTimer[i]._id},{section_start_time:bundleTimer[i]?.section_start_time,section_end_time:bundleTimer[i]?.section_end_time})
        // }
        let getSubmittedSection = bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.filter((item) => (item === null || item === void 0 ? void 0 : item.is_submitted) == true);
        if ((getSubmittedSection === null || getSubmittedSection === void 0 ? void 0 : getSubmittedSection.length) > 0) {
            for (let i = 0; i < (getSubmittedSection === null || getSubmittedSection === void 0 ? void 0 : getSubmittedSection.length); i++) {
                let bundleUpdate = yield bundle_model_1.default.findByIdAndUpdate({ _id: (_f = getSubmittedSection[i]) === null || _f === void 0 ? void 0 : _f._id }, { section_start_time: "", section_end_time: "" });
            }
        }
        let firstPendingSection = bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.find((item) => (item === null || item === void 0 ? void 0 : item.is_submitted) == false);
        let time1 = new Date();
        let time2 = new Date();
        let bundleTimer = {
            _id: firstPendingSection === null || firstPendingSection === void 0 ? void 0 : firstPendingSection._id,
            section_start_time: time1.setMinutes(time1.getMinutes()),
            section_end_time: time2.setMinutes(time2.getMinutes() + (firstPendingSection === null || firstPendingSection === void 0 ? void 0 : firstPendingSection.section_timer) || 10)
        };
        let bundleUpdateNew = yield bundle_model_1.default.findByIdAndUpdate({ _id: bundleTimer._id }, { section_start_time: bundleTimer === null || bundleTimer === void 0 ? void 0 : bundleTimer.section_start_time, section_end_time: bundleTimer === null || bundleTimer === void 0 ? void 0 : bundleTimer.section_end_time });
        let bundleIDArr = bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.map((item) => {
            return new ObjectId(item === null || item === void 0 ? void 0 : item._id);
        });
        let questionDetails = yield question_model_1.default.aggregate([
            {
                $match: {
                    bundle: {
                        $in: bundleIDArr
                    },
                    access_type: "answers"
                }
            },
            {
                $group: {
                    "_id": "$bundle",
                    "questions": { $push: "$$ROOT" }
                }
            }
        ]);
        let questionArrayFinal = {};
        for (let i = 0; i < (questionDetails === null || questionDetails === void 0 ? void 0 : questionDetails.length); i++) {
            questionArrayFinal[(_g = questionDetails[i]) === null || _g === void 0 ? void 0 : _g._id] = (_h = questionDetails[i]) === null || _h === void 0 ? void 0 : _h.questions;
        }
        let finalDataObj = {
            status: false,
            info: "Data Fetched Successfully",
            data: {
                mockDetails: mockDetails._doc,
                bundleDetails: [...bundleDetails],
                questionDetails: questionArrayFinal
            }
        };
        return res.status(200).json(finalDataObj);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        });
    }
});
exports.getAllDetailsAboutMock = getAllDetailsAboutMock;
const updateMockBundleSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateBundle = yield bundle_model_1.default.findByIdAndUpdate({ _id: req.params.bundleId }, {
            is_submitted: true
        }, { new: true });
        if (!updateBundle) {
            return res.status(400).json({
                status: true,
                info: "Failed to update"
            });
        }
        return res.json({
            status: false,
            info: "Updated Successfully",
            data: updateBundle
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        });
    }
});
exports.updateMockBundleSubmit = updateMockBundleSubmit;
const updateMockBundleNextStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        let time1 = new Date();
        let time2 = new Date();
        let bundleDetails = yield bundle_model_1.default.findById({ _id: req.params.bundleId });
        let bundleDetailsFull = yield bundle_model_1.default.find({ mock: bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.mock });
        let getSubmittedSection = bundleDetailsFull === null || bundleDetailsFull === void 0 ? void 0 : bundleDetailsFull.filter((item) => item.is_submitted == true);
        if ((getSubmittedSection === null || getSubmittedSection === void 0 ? void 0 : getSubmittedSection.length) > 0) {
            for (let i = 0; i < (getSubmittedSection === null || getSubmittedSection === void 0 ? void 0 : getSubmittedSection.length); i++) {
                let bundleUpdate = yield bundle_model_1.default.findByIdAndUpdate({ _id: (_j = getSubmittedSection[i]) === null || _j === void 0 ? void 0 : _j._id }, { section_start_time: "", section_end_time: "" });
            }
        }
        // return {
        //     _id: item?._id,
        //     section_start_time: time1.setSeconds(time1.getSeconds() + (i * 10)),
        //     section_end_time: time2.setSeconds(time2.getSeconds() + (i + 1) * 10)
        // }
        let timerObj = {
            section_start_time: time1.setMinutes(time1.getMinutes()),
            section_end_time: time2.setMinutes(time2.getMinutes() + (bundleDetails === null || bundleDetails === void 0 ? void 0 : bundleDetails.section_timer))
        };
        let updateBundle = yield bundle_model_1.default.findByIdAndUpdate({ _id: req.params.bundleId }, timerObj, { new: true });
        if (!updateBundle) {
            return res.status(400).json({
                status: true,
                info: "Failed to update"
            });
        }
        return res.json({
            status: false,
            info: "Updated Successfully",
            data: updateBundle
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock details for  unknown reason'
        });
    }
});
exports.updateMockBundleNextStatus = updateMockBundleNextStatus;
const getAllMocksByPageAndFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        let params = req.body;
        let query = {
            mock_type: {
                $eq: "paper"
            }
        };
        let options = {
            page: (params === null || params === void 0 ? void 0 : params.pageNumber) || 1,
            limit: (params === null || params === void 0 ? void 0 : params.pageSize) || 10,
            sort: {
                'created': (params === null || params === void 0 ? void 0 : params.sort) || -1
            }
        };
        let mockDetails = yield mock_model_1.default.paginate(query, options);
        if (((_k = mockDetails === null || mockDetails === void 0 ? void 0 : mockDetails.docs) === null || _k === void 0 ? void 0 : _k.length) < 1) {
            return res.status(404).json({
                status: true,
                info: "Not Found"
            });
        }
        return res.status(200).json({
            status: false,
            info: "Found the Data",
            data: mockDetails.docs,
            totalDocs: mockDetails.totalDocs,
            limit: mockDetails.limit,
            totalPages: mockDetails.totalPages,
            page: mockDetails.page
        });
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: error.message
        });
    }
});
exports.getAllMocksByPageAndFilter = getAllMocksByPageAndFilter;