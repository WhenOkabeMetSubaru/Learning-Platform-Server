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
exports.updateBundleByID = exports.getAllBundles = exports.getAllBundlesByMock = exports.getAllBundlesByUser = exports.getBundleByID = exports.getPendingBundleByUser = exports.addNewBundleToMock = exports.addNewBundleByUser = void 0;
const user_model_1 = __importDefault(require("../models/user/user.model"));
const bundle_model_1 = __importDefault(require("../models/question/bundle.model"));
const addNewBundleByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bundleDetails = req.body;
        // if(!bundleDetails.mock){
        //     let checkExists = await Bundle.findOne({ created_by: req.user._id, completion_status: "pending" });
        //     if (checkExists) {
        //         return {
        //             status: true,
        //             info: "Already Exists"
        //         }
        //     }
        // }else{
        //     bundleDetails.completion_status = "completed"
        // }
        bundleDetails.created_by = req.user._id;
        let bundleCreate = new bundle_model_1.default(bundleDetails);
        let finalBundle = yield bundleCreate.save();
        let finalOutput = {
            status: false,
            info: "bundle Created Successfully",
            data: finalBundle
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: true,
            info: "Unable to create bundle for some unknown reason"
        });
    }
});
exports.addNewBundleByUser = addNewBundleByUser;
const addNewBundleToMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bundleDetails = req.body;
        let bundleCreate = new bundle_model_1.default(bundleDetails);
        let finalBundle = yield bundleCreate.save();
        let finalOutput = {
            status: false,
            info: "bundle Created Successfully",
            data: finalBundle
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create bundle for some unknown reason"
        });
    }
});
exports.addNewBundleToMock = addNewBundleToMock;
const getPendingBundleByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield bundle_model_1.default.findOne({ created_by: req.user._id, completion_status: 'pending' });
        if (!mockDetails) {
            return res.status(404).json({
                status: true,
                info: 'Bundle not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Bundle Found",
            data: mockDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundle information for some unknown reason'
        });
    }
});
exports.getPendingBundleByUser = getPendingBundleByUser;
const getBundleByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not fetch mock information for some unknown reason'
        });
    }
});
exports.getBundleByID = getBundleByID;
const getAllBundlesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bundleDetails = yield bundle_model_1.default.find({ created_by: req.user._id });
        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        });
    }
});
exports.getAllBundlesByUser = getAllBundlesByUser;
const getAllBundlesByMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bundleDetails = yield bundle_model_1.default.find({ mock: req.params.mockId });
        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        });
    }
});
exports.getAllBundlesByMock = getAllBundlesByMock;
const getAllBundles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bundleDetails = yield bundle_model_1.default.find({});
        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'bundles not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: bundleDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch bundles for some  unknown reason'
        });
    }
});
exports.getAllBundles = getAllBundles;
const updateBundleByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // let bundleVerify = await Bundle.findById({ _id: req.params.mockId });
        // if (bundleVerify.created_by !== req?.user?._id) {
        //     return res.status(401).json({
        //         status: true,
        //         info: "UnAuthorized Access"
        //     })
        // }
        let bundleDetails = yield bundle_model_1.default.findByIdAndUpdate({ _id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.bundleId }, req.body, { new: true });
        if (!bundleDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'bundle updated',
            data: bundleDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: true,
            info: 'Could not update bundle information for some unknown reason'
        });
    }
});
exports.updateBundleByID = updateBundleByID;
