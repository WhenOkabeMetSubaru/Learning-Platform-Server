
import { Router } from "express";
import { addNewAnsweredByUser, getAllAnswereds, getAllAnsweredsByUser, getAnsweredByID, updateAnsweredByID } from '../controllers/answered.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/answered/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllAnswereds)

router.route('/v1/answered/user')
    .get(requireSignin, attachUser, isValidUserAny, getAllAnsweredsByUser)

router.route('/v1/answered/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewAnsweredByUser)

router.route('/v1/answered/update/:answeredId')
    .post(requireSignin, attachUser, isValidUserAny, updateAnsweredByID)

router.route('/v1/answered/:answeredId')
    .get(requireSignin, attachUser, isValidUserAny, getAnsweredByID)

export default router;