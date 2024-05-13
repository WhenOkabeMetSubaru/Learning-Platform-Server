
import { Router } from "express";
import { addNewCategoryByUser, getAllCategories } from '../controllers/category.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/category/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllCategories)


router.route('/v1/category/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewCategoryByUser)



export default router;