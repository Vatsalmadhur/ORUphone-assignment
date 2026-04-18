"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const sessionTracker_1 = require("./middlewares/sessionTracker");
const sessionTrackRoutes_1 = __importDefault(require("./routes/sessionTrackRoutes"));
const connectToDB_1 = require("./db/connectToDB");
const typeorm_1 = __importDefault(require("./db/typeorm"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
console.log(process.env.CORS_ORIGIN);
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express_1.default.json());
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_URL,
    port: 19635,
    username: 'default',
    password: process.env.REDIS_PASSWORD,
});
const redisStore = new connect_redis_1.default({ client: redisClient });
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: "this is s secret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 },
}));
(0, typeorm_1.default)();
app.use(sessionTracker_1.sessionTracker);
app.use("/", sessionTrackRoutes_1.default);
(0, connectToDB_1.connectToDB)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
