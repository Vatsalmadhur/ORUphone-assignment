import {body, query} from 'express-validator';
export const validateUserTracking = [
  body('[0].clicks').isArray().withMessage('clicks must be an array'),
  body('[0].clicks.*').isString().trim().escape(),
  body('[0].page').isString().trim().escape(),
  body('[0].scrollDepth').isNumeric().withMessage('scrollDepth must be a number'),
  body('[0].timeSpent').isNumeric().withMessage('timeSpent must be a number'),
  body('[0].timestamp').isInt({ min: 0 }).withMessage('timestamp must be a valid number')
];


export const validateSignup = [
  body('username')
    .trim()
    .notEmpty().withMessage('username is required')
    .escape(),

  body('email')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .trim()
];

export const validateLogin = [
  body('username')
    .trim().notEmpty().withMessage('username is required').escape(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .trim()
];

export const validateDateRangeQuery = [
  query('startDate')
    .isISO8601().withMessage('startDate must be a valid ISO8601 date')
    .toDate(),

  query('endDate')
    .isISO8601().withMessage('endDate must be a valid ISO8601 date')
    .toDate()
];

