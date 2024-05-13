"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/category/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, category_controller_1.getAllCategories);
router.route('/v1/category/add')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, category_controller_1.addNewCategoryByUser);
exports.default = router;
