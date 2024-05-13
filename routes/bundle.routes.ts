
import { Router } from "express";
import { addNewBundleByUser, getAllBundles, getAllBundlesByUser, getBundleByID,updateBundleByID,getPendingBundleByUser, getAllBundlesByMock} from '../controllers/bundle.controller';
import { signUp, signin, hasAuthorization, requireSignin, isUser, isAdmin, isPaidUser, isValidUserAny, attachUser } from '../auth/auth'

const router = Router();



router.route('/v1/bundle/all')
    .get(requireSignin, attachUser, isValidUserAny, getAllBundles)

router.route('/v1/bundle/user')
    .get(requireSignin, attachUser, isValidUserAny, getAllBundlesByUser)

router.route('/v1/bundle/add')
    .post(requireSignin, attachUser, isValidUserAny, addNewBundleByUser)

router.route('/v1/bundle/update/:bundleId')
    .patch(requireSignin, attachUser, isValidUserAny, updateBundleByID)


router.route('/v1/bundle/pending')
    .get(requireSignin, attachUser, isValidUserAny, getPendingBundleByUser)

router.route('/v1/bundle/mock/:mockId')
    .get(requireSignin,attachUser,isValidUserAny,getAllBundlesByMock)

router.route('/v1/bundle/:bundleId')
    .get(requireSignin, attachUser, isValidUserAny, getBundleByID);


export default router;