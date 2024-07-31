"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DOMAIN = `${SERVER_HOSTNAME}:${SERVER_PORT}`;
const SERVER_HOST_SCHEMA = process.env.SERVER_HOST_SCHEMA || 'http';
const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'voucher';
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URI = MONGO_USERNAME && MONGO_PASSWORD
    ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?retryWrites=true&w=majority`
    : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    schema: SERVER_HOST_SCHEMA,
    domain: DOMAIN
};
const MONGO = {
    host: MONGO_HOST,
    database: MONGO_DATABASE,
    uri: MONGO_URI,
};
const KEY = process.env.KEY;
const config = {
    server: SERVER,
    mongo: MONGO,
    key: KEY
};
exports.default = config;
