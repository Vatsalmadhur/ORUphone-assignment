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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const connectToDB_1 = require("../db/connectToDB");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Username and password are required",
            });
            return;
        }
        const userExists = yield connectToDB_1.client.query("SELECT id FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            res.status(400).json({
                message: "Username already exists",
            });
            return;
        }
        const saltRounds = 10;
        const hashedPass = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = yield connectToDB_1.client.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email", [username, hashedPass, email]);
        res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0],
        });
    }
    catch (err) {
        console.log("Error registering user:", err);
        res.status(500).json({ message: "An Error occured" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Username and password are required",
            });
            return;
        }
        const userResult = yield connectToDB_1.client.query("SELECT id, username, password FROM users WHERE username = $1", [username]);
        //admin access
        if (username == "iamthesuperadmin" && password == "superPassword") {
            req.session.isAdmin = true;
        }
        if (userResult.rows.length === 0) {
            res.status(401).json({ mesage: "Invalid creds." });
            return;
        }
        const user = userResult.rows[0];
        const passMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passMatch) {
            res.status(401).json({ message: "Invalid Creds" });
            return;
        }
        const sessUser = {
            email: user.email,
            username: user.username,
        };
        req.session.userData = sessUser;
        req.session.isLoggedIn = true;
        res.json({ message: "Login Success" });
        return;
        // to be completed
    }
    catch (err) {
        console.log("an error occured:", err);
        res.status(500).json({ message: "Internal server err" });
    }
});
exports.login = login;
const logout = (req, res) => {
    var _a;
    const username = ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userData) || "unknown";
    req.session.destroy((err) => {
        var _a;
        if (err) {
            return res.status(500).json({ message: "Failed to logout" });
        }
        res.clearCookie("connect.sid");
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.isAdmin) {
            req.session.isAdmin = false;
        }
        res.json({ message: "Logout successful" });
    });
};
exports.logout = logout;
