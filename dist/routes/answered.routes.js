"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answered_controller_1 = require("../controllers/answered.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/answered/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, answered_controller_1.getAllAnswereds);
router.route('/v1/answered/user')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, answered_controller_1.getAllAnsweredsByUser);
router.route('/v1/answered/add')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, answered_controller_1.addNewAnsweredByUser);
router.route('/v1/answered/update/:answeredId')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, answered_controller_1.updateAnsweredByID);
router.route('/v1/answered/:answeredId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, answered_controller_1.getAnsweredByID);
exports.default = router;
