
import { Router } from "express";
import { addNewCategoryByUser, getAllCategories,getAllParentCategories,getAllSubCategories } from '../controllers/category.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/category/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllCategories)


router.route('/v1/category/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewCategoryByUser)

router.route('/v1/category/parent/all')
    .get(requireSignin,attachUser,isValidUserAny,getAllParentCategories)

router.route('/v1/category/parent/:parentId/subcategory')
    .get(requireSignin,attachUser,isValidUserAny,getAllSubCategories)

export default router;