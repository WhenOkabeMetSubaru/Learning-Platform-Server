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
exports.getAllUsers = exports.updateUserByID = exports.getUserByToken = exports.getUserByID = exports.addNewUser = void 0;
const user_model_1 = __importDefault(require("../models/user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userDetails = req.body;
    if (!userDetails.role) {
        return res.status(400).json({
            status: true,
            info: "No Role Specified for the user"
        });
    }
    let createdUser = new user_model_1.default(userDetails);
    if (!createdUser) {
        return res.status(400).json({
            status: true,
            info: "Could not create a user"
        });
    }
    let finalUser = yield createdUser.save();
    let finalOutput = {
        status: false,
        info: "User Created Success",
        data: finalUser
    };
    return res.status(200).json(finalOutput);
});
exports.addNewUser = addNewUser;
const getUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let userDetails = yield user_model_1.default.findById({ _id: req.params.userId });
        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            });
        }
        if (((_a = userDetails._id) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = req.user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
            return res.status(401).json({
                status: true,
                info: "User Not Authorized"
            });
        }
        let finalOutput = {
            status: false,
            info: "User Found",
            data: userDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch user information for some unknown reason'
        });
    }
});
exports.getUserByID = getUserByID;
const getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let decoded = jsonwebtoken_1.default.verify((_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c.authorization.split(" ")[1], "easyboi");
        let userDetails = yield user_model_1.default.findById({ _id: decoded._id });
        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'User Found',
            data: userDetails
        };
        res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch user  unknown reason'
        });
    }
});
exports.getUserByToken = getUserByToken;
const updateUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        let userDetails = yield user_model_1.default.findByIdAndUpdate({ _id: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id }, req.body, { new: true });
        if (!userDetails) {
            return res.status(404).json({
                status: true,
                info: 'User not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'User updated',
            data: userDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch user information for some unknown reason'
        });
    }
});
exports.updateUserByID = updateUserByID;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userDetails = yield user_model_1.default.find({}).select('-hashed_password');
        if ((!userDetails)) {
            return res.status(400).json({
                status: true,
                info: 'Users Not Found',
                data: []
            });
        }
        return res.status(200).json({
            status: false,
            info: 'Users Found',
            data: userDetails
        });
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch user  unknown reason'
        });
    }
});
exports.getAllUsers = getAllUsers;
