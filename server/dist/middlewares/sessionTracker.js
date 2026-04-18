"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionTracker = void 0;
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const useragent_1 = __importDefault(require("useragent"));
const sessionTracker = (req, res, next) => {
    const agent = useragent_1.default.parse(req.headers["user-agent"] || "");
    const ip = req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;
    const locationData = geoip_lite_1.default.lookup(ip);
    const location = locationData && locationData.city
        ? locationData.city
        : "Unknown";
    req.session.userData = {
        sessionId: req.sessionID,
        ip: ip,
        browser: agent.toAgent(),
        location: location || "unknown",
        os: agent.os.toString(),
        device: agent.device.toString(),
        isLoggedIn: req.session.isLoggedIn || false,
        isAdmin: req.session.isAdmin || false,
    };
    next();
};
exports.sessionTracker = sessionTracker;
