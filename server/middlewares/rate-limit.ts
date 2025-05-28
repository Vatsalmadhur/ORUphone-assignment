// middlewares/rateLimiters.ts
import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: 'Too many attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});


export const adminRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: 'Too many requests to admin route. Try again after 1 minute',
});

