"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bundle_controller_1 = require("../controllers/bundle.controller");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.route('/v1/bundle/all')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.getAllBundles);
router.route('/v1/bundle/user')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.getAllBundlesByUser);
router.route('/v1/bundle/add')
    .post(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.addNewBundleByUser);
router.route('/v1/bundle/update/:bundleId')
    .patch(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.updateBundleByID);
router.route('/v1/bundle/pending')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.getPendingBundleByUser);
router.route('/v1/bundle/mock/:mockId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.getAllBundlesByMock);
router.route('/v1/bundle/:bundleId')
    .get(auth_1.requireSignin, auth_1.attachUser, auth_1.isValidUserAny, bundle_controller_1.getBundleByID);
exports.default = router;
