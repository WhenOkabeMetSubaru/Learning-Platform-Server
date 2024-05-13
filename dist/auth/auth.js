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
exports.isValidUserAny = exports.isAdmin = exports.isPaidUser = exports.isUser = exports.attachUser = exports.hasAuthorization = exports.requireSignin = exports.signout = exports.signin = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user/user.model"));
var jsonwt = require('jsonwebtoken');
const express_jwt_1 = require("express-jwt");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let checkUser = yield user_model_1.default.findOne({ email: req.body.email });
        console.log(checkUser);
        if (checkUser) {
            return res.json({
                status: false,
                info: "User Already Exist"
            });
        }
        let addedUser = new user_model_1.default(req.body);
        let result = yield addedUser.save();
        if (!result) {
            return res.status(400).json({
                status: true,
                info: 'Could not add user for some unknown reason'
            });
        }
        console.log(result);
        return res.status(200).json({
            status: false,
            info: 'User Created Success',
            data: result._doc
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not add new user for some unknown reason'
        });
    }
});
exports.signUp = signUp;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let user = yield user_model_1.default.findOne({ "email": req.body.email });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." });
        }
        const token = jsonwt.sign({ _id: user._id }, process.env.SECRET_HASH_KEY);
        let date = new Date();
        date.setDate(date.getDate() + 7);
        res.cookie("secret_token", token, { expires: date, sameSite: 'none' });
        return res.json({
            token
        });
    }
    catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
});
exports.signin = signin;
const signout = (req, res) => {
    res.clearCookie("secret_token");
    return res.status(200).json({
        message: "signed out"
    });
};
exports.signout = signout;
exports.requireSignin = (0, express_jwt_1.expressjwt)({
    secret: "easyboi",
    algorithms: ['RS256', 'HS256']
});
const hasAuthorization = (req, res, next) => {
    // if(req.headers.authorization.includes("Bearer")){
    //     return res.status(401).json({
    //         error:'Invalid token'
    //     })
    // }
    const authorized = req.user && req.auth && req.user._id == req.auth._id;
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
};
exports.hasAuthorization = hasAuthorization;
const attachUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.auth) {
        return res.status(401).json({
            error: true,
            message: 'Not Authorized'
        });
    }
    let userDetails = yield user_model_1.default.findById({ _id: req.auth._id });
    if (!userDetails) {
        return res.status(403).json({
            error: true,
            message: 'No User Found'
        });
    }
    userDetails.hashed_password = undefined;
    userDetails.salt = undefined;
    req.user = userDetails;
    next();
});
exports.attachUser = attachUser;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== 'user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        });
    }
    next();
});
exports.isUser = isUser;
const isPaidUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.user_type !== 'paid_user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        });
    }
    next();
});
exports.isPaidUser = isPaidUser;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.user_type !== 'admin') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        });
    }
    next();
});
exports.isAdmin = isAdmin;
const isValidUserAny = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.user_type !== 'user' && req.user.user_type !== 'admin' && req.user.user_type !== 'paid_user') {
        return res.status(401).json({
            error: true,
            message: "User Not Authorized"
        });
    }
    next();
});
exports.isValidUserAny = isValidUserAny;
