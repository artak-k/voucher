"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./logging"));
const NAMESPACE = 'DATABASE';
const connect = async (input) => {
    const { dbUri } = input;
    try {
        await mongoose_1.default.connect(dbUri);
        logging_1.default.info(NAMESPACE, `Successfully connected to ${dbUri}`);
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `Failed to connect to MongoDB: ${error}`);
    }
};
exports.default = connect;
