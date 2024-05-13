
import { Router } from "express";
import { getAllUsers, getUserByID, getUserByToken, updateUserByID } from '../controllers/user.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/user/all')
    .get(getAllUsers)

router.route('/v1/user/signup')
    .post(signUp)

router.route('/v1/user/signin')
    .post(signin)

router.route('/v1/user/info')
    .get(requireSignin, attachUser, isValidUserAny, getUserByToken)

router.route('/v1/user/info/all')
    .get(requireSignin, attachUser, isAdmin, getAllUsers)

router.route('/v1/user/info/update/:userId')
    .put(requireSignin, attachUser, isValidUserAny, updateUserByID);

router.route('/v1/user/info/:userId')
    .get(requireSignin, attachUser, isValidUserAny, getUserByID)

export default router;