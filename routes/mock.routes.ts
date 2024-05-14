
import { Router } from "express";
import {addNewMockByUser,getAllMocks,getAllMocksByPageAndFilter,
    getAllDetailsAboutMockResultPage,deleteAttemptedMockByUser, getAllMocksByUser,getMockByID,updateMockBundleSubmit,
    updateMockBundleNextStatus,getAllAttemptedMocksByUser, getPendingMockByUser,updateMockByID,getMockAccess,getAllDetailsAboutMock  } from '../controllers/mock.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();




router.route('/v1/mock/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewMockByUser)

router.route('/v1/mock/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllMocks)

router.route('/v1/mock/pagination/all')
    .get(requireSignin,attachUser,isValidUserAny,getAllMocksByPageAndFilter)

router.route('/v1/mock/user')
    .get(requireSignin, attachUser, isValidUserAny,getAllMocksByUser)


router.route('/v1/mock/attempted/user')
    .get(requireSignin, attachUser, isValidUserAny,getAllAttemptedMocksByUser )

router.route('/v1/mock/update/:mockId')
    .patch(requireSignin, attachUser, isValidUserAny,updateMockByID)

router.route('/v1/mock/pending')
    .get(requireSignin,attachUser,isValidUserAny,getPendingMockByUser)

router.route('/v1/mock/:mockId')
    .get(requireSignin, attachUser, isValidUserAny, getMockByID)

router.route('/v1/mock/access/new/:mockId')
    .get(requireSignin,attachUser,isValidUserAny,getMockAccess)

router.route('/v1/mock/details/all/:mockId')
    .get(requireSignin,attachUser,isValidUserAny,getAllDetailsAboutMock)

router.route('/v1/mock/details/delete/:mockId')
    .delete(requireSignin,attachUser,isValidUserAny,deleteAttemptedMockByUser)

router.route('/v1/mock/details/result/:mockId')
    .get(requireSignin, attachUser, isValidUserAny, getAllDetailsAboutMockResultPage)

router.route('/v1/mock/bundle/:bundleId/submit')
    .patch(requireSignin,attachUser,isValidUserAny,updateMockBundleSubmit)

router.route('/v1/mock/bundle/:bundleId/next')
    .patch(requireSignin, attachUser, isValidUserAny, updateMockBundleNextStatus)



export default router;