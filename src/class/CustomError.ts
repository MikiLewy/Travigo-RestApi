export class CustomError extends Error {
  statusCode;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  getErrorMessage() {
    return this.message;
  }
}
