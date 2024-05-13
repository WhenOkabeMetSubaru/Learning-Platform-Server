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
exports.updateCategoryByID = exports.getAllCategories = exports.getCategoryByID = exports.addNewCategoryToMock = exports.addNewCategoryByUser = void 0;
const category_model_1 = __importDefault(require("../models/category/category.model"));
const addNewCategoryByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryDetails = req.body;
        let categoryCreate = new category_model_1.default(categoryDetails);
        let finalCategory = yield categoryCreate.save();
        let finalOutput = {
            status: false,
            info: "Category Created Successfully",
            data: finalCategory
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Category for some unknown reason"
        });
    }
});
exports.addNewCategoryByUser = addNewCategoryByUser;
const addNewCategoryToMock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let CategoryDetails = req.body;
        let CategoryCreate = new category_model_1.default(CategoryDetails);
        let finalCategory = yield CategoryCreate.save();
        let finalOutput = {
            status: false,
            info: "Category Created Successfully",
            data: finalCategory
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(500).json({
            status: true,
            info: "Unable to create Category for some unknown reason"
        });
    }
});
exports.addNewCategoryToMock = addNewCategoryToMock;
const getCategoryByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mockDetails = yield category_model_1.default.findById({ _id: req.params.mockId });
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
exports.getCategoryByID = getCategoryByID;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let CategoryDetails = yield category_model_1.default.find({});
        if (!CategoryDetails) {
            return res.status(404).json({
                status: true,
                info: 'Categorys not found'
            });
        }
        let finalOutput = {
            status: false,
            info: "Mock Found",
            data: CategoryDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not fetch Categorys for some  unknown reason'
        });
    }
});
exports.getAllCategories = getAllCategories;
const updateCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let CategoryVerify = yield category_model_1.default.findById({ _id: req.params.mockId });
        if (CategoryVerify.created_by !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return res.status(401).json({
                status: true,
                info: "UnAuthorized Access"
            });
        }
        let CategoryDetails = yield category_model_1.default.findByIdAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.CategoryId }, req.body, { new: true });
        if (!CategoryDetails) {
            return res.status(404).json({
                status: true,
                info: 'Mock not found'
            });
        }
        let finalOutput = {
            status: false,
            info: 'Category updated',
            data: CategoryDetails
        };
        return res.status(200).json(finalOutput);
    }
    catch (error) {
        return res.status(400).json({
            status: true,
            info: 'Could not update Category information for some unknown reason'
        });
    }
});
exports.updateCategoryByID = updateCategoryByID;
