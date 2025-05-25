
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include session with user info
export default function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Access denied. Admins only." });
return;
}

