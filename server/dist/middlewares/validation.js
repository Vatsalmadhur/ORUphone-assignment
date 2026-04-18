"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateRangeQuery = exports.validateLogin = exports.validateSignup = exports.validateUserTracking = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserTracking = [
    (0, express_validator_1.body)('[0].clicks').isArray().withMessage('clicks must be an array'),
    (0, express_validator_1.body)('[0].clicks.*').isString().trim().escape(),
    (0, express_validator_1.body)('[0].page').isString().trim().escape(),
    (0, express_validator_1.body)('[0].scrollDepth').isNumeric().withMessage('scrollDepth must be a number'),
    (0, express_validator_1.body)('[0].timeSpent').isNumeric().withMessage('timeSpent must be a number'),
    (0, express_validator_1.body)('[0].timestamp').isInt({ min: 0 }).withMessage('timestamp must be a valid number')
];
exports.validateSignup = [
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty().withMessage('username is required')
        .escape(),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .trim()
];
exports.validateLogin = [
    (0, express_validator_1.body)('username')
        .trim().notEmpty().withMessage('username is required').escape(),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required')
        .trim()
];
exports.validateDateRangeQuery = [
    (0, express_validator_1.query)('startDate')
        .isISO8601().withMessage('startDate must be a valid ISO8601 date')
        .toDate(),
    (0, express_validator_1.query)('endDate')
        .isISO8601().withMessage('endDate must be a valid ISO8601 date')
        .toDate()
];
