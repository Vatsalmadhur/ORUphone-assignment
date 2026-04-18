"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const typeorm_1 = require("typeorm");
const UserVisit_entity_1 = require("./UserVisit.entity");
let UserSession = class UserSession {
};
exports.UserSession = UserSession;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserSession.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'unknown' }),
    __metadata("design:type", String)
], UserSession.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'unknown' }),
    __metadata("design:type", String)
], UserSession.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'unknown' }),
    __metadata("design:type", String)
], UserSession.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'unknown' }),
    __metadata("design:type", String)
], UserSession.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'unknown' }),
    __metadata("design:type", String)
], UserSession.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isLoggedIn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserVisit_entity_1.UserVisit, (visit) => visit.session, { cascade: true }),
    __metadata("design:type", Array)
], UserSession.prototype, "visits", void 0);
exports.UserSession = UserSession = __decorate([
    (0, typeorm_1.Entity)('user_session_data')
], UserSession);
