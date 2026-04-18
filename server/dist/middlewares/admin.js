"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isAdmin;
// Extend the Request interface to include session with user info
function isAdmin(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        return next();
    }
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
}
