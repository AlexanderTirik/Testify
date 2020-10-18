export default class CustomError {
  status: number;
  message?: string;
  errorCode?: number;

  constructor(status: number, message?: string, errorCode?: number) {
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }
}
