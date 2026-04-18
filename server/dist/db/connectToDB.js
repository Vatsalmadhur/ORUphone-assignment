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
exports.client = void 0;
exports.connectToDB = connectToDB;
exports.disconnectFromDB = disconnectFromDB;
exports.queryDB = queryDB;
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || "5432"),
    database: "oru_user_tracking",
    ssl: true
});
exports.client = client;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to PostgreSQL database");
        }
        catch (error) {
            console.error("Error connecting to PostgreSQL database", error);
        }
    });
}
function disconnectFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.end();
            console.log("Disconnected from PostgreSQL database");
        }
        catch (error) {
            console.error("Error disconnecting from PostgreSQL database", error);
            throw error;
        }
    });
}
function queryDB(text, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(text, params);
            return result;
        }
        catch (error) {
            console.error("Error executing query", error);
            throw error;
        }
    });
}
