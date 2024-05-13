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
exports.updateAnsweredByID = exports.getAllAnswereds = exports.getAllAnsweredsByMock = exports.getAllAnsweredsByUser = exports.getAnsweredByID = exports.addNewAnsweredToMock = exports.addNewAnsweredByUser = void 0;
const user_model_1 = __importDefault(require("../models/user/user.model"));
const answered_model_1 = __importDefault(require("../models/question/answered.model"));
const addNewAnsweredByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AnsweredDetails = req.body;
        let answeredCreate = new answered_model_1.default(AnsweredDetails);
        let finalAnswered = yield answeredCreate.save();
        let finalOutput = {
            status: false,
            info: "Answered Created Successfully",
            data: finalAnswered
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Answered for some unknown reason"
        });
    }
});
exports.addNewAnsweredByUser = addNewAnsweredByUser;
const addNewAnsweredToMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answeredDetails = req.body;
        let answeredCreate = new answered_model_1.default(answeredDetails);
        let finalAnswered = yield answeredCreate.save();
        let finalOutput = {
            status: false,
            info: "Answered Created Successfully",
            data: finalAnswered
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Answered for some unknown reason"
        });
    }
});
exports.addNewAnsweredToMock = addNewAnsweredToMock;
const getAnsweredByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answerDetails = yield user_model_1.default.findById({ _id: req.params.answerId });
        if (!answerDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: answerDetails
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
exports.getAnsweredByID = getAnsweredByID;
const getAllAnsweredsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AnsweredDetails = yield answered_model_1.default.find({ created_by: req.user._id });
        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answers not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Answer Found",
            data: AnsweredDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        });
    }
});
exports.getAllAnsweredsByUser = getAllAnsweredsByUser;
const getAllAnsweredsByMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AnsweredDetails = yield answered_model_1.default.find({ mock: req.params.mockId });
        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answereds not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: AnsweredDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        });
    }
});
exports.getAllAnsweredsByMock = getAllAnsweredsByMock;
const getAllAnswereds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AnsweredDetails = yield answered_model_1.default.find({});
        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Answereds not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: AnsweredDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch Answereds for some  unknown reason'
        });
    }
});
exports.getAllAnswereds = getAllAnswereds;
const updateAnsweredByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let AnsweredVerify = yield answered_model_1.default.findById({ _id: req.params.mockId });
        if (AnsweredVerify.created_by !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            });
        }
        let AnsweredDetails = yield answered_model_1.default.findByIdAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.AnsweredId }, req.body, { new: true });
        if (!AnsweredDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'Answered updated',
            data: AnsweredDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not update Answered information for some unknown reason'
        });
    }
});
exports.updateAnsweredByID = updateAnsweredByID;
