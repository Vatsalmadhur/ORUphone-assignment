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
exports.UserVisit = void 0;
const typeorm_1 = require("typeorm");
const UserSession_entity_1 = require("./UserSession.entity");
const VisitAction_entity_1 = require("./VisitAction.entity");
let UserVisit = class UserVisit {
};
exports.UserVisit = UserVisit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserVisit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserSession_entity_1.UserSession, (session) => session.visits, { onDelete: 'CASCADE' }),
    __metadata("design:type", UserSession_entity_1.UserSession)
], UserVisit.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserVisit.prototype, "pageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], UserVisit.prototype, "timeSpent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], UserVisit.prototype, "scrollDepth", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserVisit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => VisitAction_entity_1.VisitAction, (action) => action.visit, { cascade: true }),
    __metadata("design:type", Array)
], UserVisit.prototype, "actions", void 0);
exports.UserVisit = UserVisit = __decorate([
    (0, typeorm_1.Entity)('user_visits')
], UserVisit);
