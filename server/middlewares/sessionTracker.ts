import { NextFunction, Request, Response } from "express";
import geoip from "geoip-lite";
import useragent from "useragent";
export const sessionTracker = (
        req: Request,
        res: Response,
        next: NextFunction
): void => {
        const agent = useragent.parse(req.headers["user-agent"] || "");
        const ip =
                req.headers["x-forwarded-for"] ||
                (req.socket.remoteAddress as string);
        const locationData = geoip.lookup(ip as string);
        const location =
                locationData && locationData.city
                        ? locationData.city
                        : "Unknown";
        req.session.userData = {
                sessionId: req.sessionID,
                ip: ip as string,
                browser: agent.toAgent(),
                location: location || "unknown",
                os: agent.os.toString(),
                device: agent.device.toString(),
                isLoggedIn: req.session.isLoggedIn || false,
                isAdmin: req.session.isAdmin || false,
        };

        next();
};
