"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyUsed = exports.BalanceNotEnough = exports.CurrencyNotFound = exports.NotFoundError = exports.ExistsError = exports.PermissionDenied = exports.UnknownError = exports.ActionNotAllowedError = exports.VoucherNotFoundError = exports.PageNotFoundError = exports.AuthenticationFailedError = exports.ValidationError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, errorCode = "API_ERROR") {
        super(message);
        this.status = false;
        this.message = message.replace(/['"]+/g, "");
        this.code = errorCode;
    }
}
exports.ApiError = ApiError;
class ValidationError extends ApiError {
    constructor(message) {
        super(message, "VALIDATION_ERROR");
    }
}
exports.ValidationError = ValidationError;
class AuthenticationFailedError extends ApiError {
    constructor() {
        super("Authentication failed", "NOT_AUTHENTICATED");
    }
}
exports.AuthenticationFailedError = AuthenticationFailedError;
class PageNotFoundError extends ApiError {
    constructor() {
        super("Page not found", "PAGE_NOT_FOUND");
    }
}
exports.PageNotFoundError = PageNotFoundError;
class VoucherNotFoundError extends ApiError {
    constructor() {
        super("Voucher not found", "VOUCHER_NOT_FOUND");
    }
}
exports.VoucherNotFoundError = VoucherNotFoundError;
class ActionNotAllowedError extends ApiError {
    constructor() {
        super("Action not allowed", "ACTION_NOT_ALLOWED");
    }
}
exports.ActionNotAllowedError = ActionNotAllowedError;
class UnknownError extends ApiError {
    constructor() {
        super("Error occurred during .save():", "UNKNOWN");
    }
}
exports.UnknownError = UnknownError;
class PermissionDenied extends ApiError {
    constructor() {
        super("Permission denied", "PERMISSION_DENIED");
    }
}
exports.PermissionDenied = PermissionDenied;
class ExistsError extends ApiError {
    constructor(message) {
        super(message, "ERROR_EXISTS");
    }
}
exports.ExistsError = ExistsError;
class NotFoundError extends ApiError {
    constructor(message) {
        super(message, "NOT_FOUND_ERROR");
    }
}
exports.NotFoundError = NotFoundError;
class CurrencyNotFound extends ApiError {
    constructor(message) {
        super(message, "CURRENCY_NOT_FOUND");
    }
}
exports.CurrencyNotFound = CurrencyNotFound;
class BalanceNotEnough extends ApiError {
    constructor() {
        super('Balance not enough', 'BALANCE_NOT_ENOUGH');
    }
}
exports.BalanceNotEnough = BalanceNotEnough;
class AlreadyUsed extends ApiError {
    constructor() {
        super('Already used', 'ALREADY_USED');
    }
}
exports.AlreadyUsed = AlreadyUsed;
