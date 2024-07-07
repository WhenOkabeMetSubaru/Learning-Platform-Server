"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/question/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestions);
router.route('/v1/question/pagination/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestionsByPageAndFilter);
router.route('/v1/question/user')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestionsByUser);
router.route('/v1/question/add')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.addNewQuestionByUser);
router.route('/v1/question/update/:questionId')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.updateQuestionByID);
router.route('/v1/question/bundle/:bundleId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestionsByBundle);
router.route('/v1/question/access/user/:questionId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getQuestionAccess);
router.route('/v1/question/mock/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestionsByMock);
router.route('/v1/question/:questionId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getQuestionByID);
router.route('/v1/question/update/mock/:questionId')
    .patch(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.updateQuestionStatusForMock);
router.route('/v1/question/home/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllQuestionsHomePage);
router.route('/v1/question/user/attempt/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getAllAttemptedQuestionsByUser);
router.route('/v1/question/view/home/user/:questionId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, question_controller_1.getQuestionDetails);
exports.default = router;
