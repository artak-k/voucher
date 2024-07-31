"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponse = void 0;
class ApiErrorResponse {
    constructor(message, errorCode) {
        this.status = false;
        this.message = message;
        this.errorCode = errorCode;
    }
}
exports.ApiErrorResponse = ApiErrorResponse;
