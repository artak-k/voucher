export class ApiResponse {
    status = true;
    result: any;
  
    constructor(result?: any) {
      this.result = result;
    }
  }