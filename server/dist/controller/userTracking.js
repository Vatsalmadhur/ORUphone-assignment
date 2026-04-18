"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userTracking;
const UserSession_entity_1 = require("../db/entities/UserSession.entity");
const UserVisit_entity_1 = require("../db/entities/UserVisit.entity");
const VisitAction_entity_1 = require("../db/entities/VisitAction.entity");
const typeorm_1 = require("../db/typeorm");
const express_validator_1 = require("express-validator");
function userTracking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userData)) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const event = req.body[0];
        const sessionData = req.session.userData;
        const sessionRepo = (0, typeorm_1.useTypeORM)(UserSession_entity_1.UserSession);
        const visitRepo = (0, typeorm_1.useTypeORM)(UserVisit_entity_1.UserVisit);
        const actionRepo = (0, typeorm_1.useTypeORM)(VisitAction_entity_1.VisitAction);
        try {
            // Check if session already exists
            let session = yield sessionRepo.findOne({
                where: { sessionId: sessionData.sessionId },
            });
            if (!session) {
                session = sessionRepo.create({
                    sessionId: sessionData.sessionId,
                    ip: sessionData.ip || '',
                    browser: sessionData.browser,
                    location: sessionData.location,
                    device: sessionData.device,
                    os: sessionData.os,
                    isLoggedIn: sessionData.isLoggedIn,
                    isAdmin: sessionData.isAdmin || false,
                    visitData: {}, // optional: store complex info here
                });
                yield sessionRepo.save(session);
                console.log(`Inserted session: ${session.sessionId}`);
            }
            // Create a visit entry
            const newVisit = visitRepo.create({
                session: session,
                pageUrl: event.page,
                timeSpent: event.timeSpent || 0,
                screenSize: event.screenSize || null,
                scrollDepth: event.scrollDepth || null,
            });
            // Save visit first to generate its ID
            const savedVisit = yield visitRepo.save(newVisit);
            // Save related actions
            const actions = (event.clicks || []).map((act) => actionRepo.create({
                visit: savedVisit,
                element: act,
            }));
            if (actions.length > 0) {
                yield actionRepo.save(actions);
            }
            res.json({ message: "Tracking data saved successfully" });
        }
        catch (error) {
            console.error("Error saving tracking data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
