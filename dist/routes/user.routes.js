"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/user/all')
    .get(user_controller_1.getAllUsers);
router.route('/v1/user/signup')
    .post(auth_1.signUp);
router.route('/v1/user/signin')
    .post(auth_1.signin);
router.route('/v1/user/info')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, user_controller_1.getUserByToken);
router.route('/v1/user/info/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isAdmin, user_controller_1.getAllUsers);
router.route('/v1/user/info/update/:userId')
    .put(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, user_controller_1.updateUserByID);
router.route('/v1/user/info/:userId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, user_controller_1.getUserByID);
exports.default = router;
