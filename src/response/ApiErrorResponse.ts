export class ApiErrorResponse {
    status = false;
    message: string;
    errorCode: string;

    constructor(message: string, errorCode: string) {
      this.message = message;
      this.errorCode = errorCode;
    }
  }