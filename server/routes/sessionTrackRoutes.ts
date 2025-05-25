import { Request, Response, Router } from "express";
import userTracking from "../controller/userTracking";
import { login, logout, register } from "../controller/authController";
import { getAnalyticsReport } from "../controller/adminController";
import isAdmin from "../middlewares/admin"
const router = Router();
router.get("/session", (req: Request, res: Response) => {
    if (!req.session.userData) {
         res.status(401).json({ error: "Unauthorized" });
        return;
    }

     res.json(req.session.userData);
});

router.post('/usertrack',userTracking)
router.post('/register',register);
router.post('/login',login)
router.post('/logout',logout);
router.get('/admin/analytics',isAdmin,getAnalyticsReport)
export default router;
