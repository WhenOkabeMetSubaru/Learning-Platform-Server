"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mock_controller_1 = require("../controllers/mock.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/mock/add')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.addNewMockByUser);
router.route('/v1/mock/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getAllMocks);
router.route('/v1/mock/pagination/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getAllMocksByPageAndFilter);
router.route('/v1/mock/user')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getAllMocksByUser);
router.route('/v1/mock/update/:mockId')
    .patch(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.updateMockByID);
router.route('/v1/mock/pending')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getPendingMockByUser);
router.route('/v1/mock/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getMockByID);
router.route('/v1/mock/access/new/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getMockAccess);
router.route('/v1/mock/details/all/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getAllDetailsAboutMock);
router.route('/v1/mock/details/result/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.getAllDetailsAboutMockResultPage);
router.route('/v1/mock/bundle/:bundleId/submit')
    .patch(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.updateMockBundleSubmit);
router.route('/v1/mock/bundle/:bundleId/next')
    .patch(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, mock_controller_1.updateMockBundleNextStatus);
exports.default = router;
