
import { Router } from "express";
import { addNewQuestionByUser, getAllQuestions,getAllQuestionsByPageAndFilter,
    getQuestionDetails,getAllAttemptedQuestionsByUser,getAllQuestionsHomePage, getAllQuestionsByBundle, getAllQuestionsByMock,updateQuestionStatusForMock,
     getAllQuestionsByUser, getQuestionByID, updateQuestionByID, getQuestionAccess } from '../controllers/question.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/question/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllQuestions)

router.route('/v1/question/pagination/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllQuestionsByPageAndFilter)

router.route('/v1/question/user')
    .get(requireSignin, attachUser, isValidUserAny, getAllQuestionsByUser)

router.route('/v1/question/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewQuestionByUser)

router.route('/v1/question/update/:questionId')
    .post(requireSignin, attachUser, isValidUserAny, updateQuestionByID)

router.route('/v1/question/bundle/:bundleId')
    .get(requireSignin,attachUser,isValidUserAny,getAllQuestionsByBundle)

router.route('/v1/question/access/user/:questionId')
    .get(requireSignin,attachUser,isValidUserAny,getQuestionAccess)

router.route('/v1/question/mock/:mockId')
    .get(requireSignin,attachUser,isValidUserAny,getAllQuestionsByMock)

router.route('/v1/question/:questionId')
    .get(requireSignin, attachUser, isValidUserAny, getQuestionByID)

router.route('/v1/question/update/mock/:questionId')
    .patch(requireSignin,attachUser,isValidUserAny,updateQuestionStatusForMock)

router.route('/v1/question/home/all')   
    .get(requireSignin,attachUser,isValidUserAny,getAllQuestionsHomePage)

router.route('/v1/question/user/attempt/all')
    .get(requireSignin,attachUser,isValidUserAny,getAllAttemptedQuestionsByUser)

router.route('/v1/question/view/home/user/:questionId')
    .get(requireSignin,attachUser,isValidUserAny,getQuestionDetails)

export default router;