export class ApiError extends Error {
    public status: boolean = false;
    public code: any;
    public message: string;
  
    constructor(message: string, errorCode = "API_ERROR") {
      super(message);
      this.message = message.replace(/['"]+/g, "");
      this.code = errorCode;
    }
  }
  
  export class ValidationError extends ApiError {
    constructor(message: string) {
      super(message, "VALIDATION_ERROR");
    }
  }
  
  export class AuthenticationFailedError extends ApiError {
    constructor() {
      super("Authentication failed", "NOT_AUTHENTICATED");
    }
  }
  
  export class PageNotFoundError extends ApiError {
    constructor() {
      super("Page not found", "PAGE_NOT_FOUND");
    }
  }

  export class VoucherNotFoundError extends ApiError {
    constructor() {
      super("Voucher not found", "VOUCHER_NOT_FOUND");
    }
  }
  

  export class ActionNotAllowedError extends ApiError {
    constructor() {
      super("Action not allowed", "ACTION_NOT_ALLOWED");
    }
  }

  export class UnknownError extends ApiError {
    constructor() {
      super("Error occurred during .save():", "UNKNOWN");
    }
  }

  export class PermissionDenied extends ApiError {
    constructor() {
      super("Permission denied", "PERMISSION_DENIED");
    }
  }

  export class ExistsError extends ApiError {
    constructor(message: string) {
      super(message, "ERROR_EXISTS")
    }
  }

  export class NotFoundError extends ApiError {
    constructor(message: string) {
      super(message, "NOT_FOUND_ERROR");
    }
  }

  export class CurrencyNotFound extends ApiError {
    constructor(message: string) {
      super(message, "CURRENCY_NOT_FOUND");
    }
  }

  export class BalanceNotEnough extends ApiError {
    constructor() {
      super('Balance not enough', 'BALANCE_NOT_ENOUGH')
    }
  }

  export class AlreadyUsed extends ApiError {
    constructor() {
      super('Already used', 'ALREADY_USED')
    }
  }

