interface ErrorParams {
  statusCode?: number;
  errorType?: string;
  componentName?: string;
}

class ErrorHandler {
  static handle(error: Error, params: ErrorParams) {
    this.log(error, params);
    this.notify(error, params);
  }

  static log(error: Error, params: ErrorParams) {
    const { statusCode, errorType, componentName } = params;

    console.error(`Error occurred in ${componentName}`);
    console.error(`Status Code: ${statusCode}`);
    console.error(`Error Type: ${errorType}`);
    console.error("Error Details:", error);
  }

  static notify(error: Error, params: ErrorParams) {}
}

export default ErrorHandler;
