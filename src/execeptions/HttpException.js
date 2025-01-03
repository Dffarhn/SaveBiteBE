class HttpException extends Error {
  constructor(message, statusCode, data = null, path = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.path = path; // Optionally include the request path
  }

  getResponse() {
    return {
      data: this.data,
      message: this.message,
      statusCode: this.statusCode,
      path: this.path,
    };
  }
}

export default HttpException;
