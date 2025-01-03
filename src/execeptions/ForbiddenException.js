import HttpException from "./HttpException.js";

class ForbiddenException extends HttpException {
  constructor(message = "Forbidden", data = null) {
    super(message, 403, data);
  }
}

export default ForbiddenException;
