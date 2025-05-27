import { NextFunction, Request, Response, Router } from "express";
import userTracking from "../controller/userTracking";
import { login, logout, register } from "../controller/authController";
import { getAnalyticsReport } from "../controller/adminController";
import isAdmin from "../middlewares/admin"
import { validateUserTracking,validateLogin,validateSignup } from "../middlewares/validation";
import { validationResult } from "express-validator";
const router = Router();
router.get("/session", (req: Request, res: Response) => {
    if (!req.session.userData) {
         res.status(401).json({ error: "Unauthorized" });
        return;
    }

     res.json(req.session.userData);
});
router.post(
  '/usertrack',
  validateUserTracking,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
  userTracking
);
router.post('/register',  validateSignup,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
register);
router.post('/login',  validateLogin,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
login)
router.post('/logout',logout);
router.get('/admin/analytics',isAdmin,getAnalyticsReport)
export default router;
