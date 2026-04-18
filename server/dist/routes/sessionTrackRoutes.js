"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userTracking_1 = __importDefault(require("../controller/userTracking"));
const authController_1 = require("../controller/authController");
const adminController_1 = require("../controller/adminController");
const admin_1 = __importDefault(require("../middlewares/admin"));
const validation_1 = require("../middlewares/validation");
const express_validator_1 = require("express-validator");
const rate_limit_1 = require("../middlewares/rate-limit");
const router = (0, express_1.Router)();
router.get("/session", (req, res) => {
    if (!req.session.userData) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    res.json(req.session.userData);
});
router.post('/usertrack', validation_1.validateUserTracking, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}, userTracking_1.default);
router.post('/register', rate_limit_1.authRateLimiter, validation_1.validateSignup, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}, authController_1.register);
router.post('/login', rate_limit_1.authRateLimiter, validation_1.validateLogin, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}, authController_1.login);
router.post('/logout', authController_1.logout);
router.get('/admin/analytics', rate_limit_1.adminRateLimiter, admin_1.default, adminController_1.getAnalyticsReport);
exports.default = router;
