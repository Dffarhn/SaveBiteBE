import HttpException from "./HttpException.js";

class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", data = null) {
    super(message, 401, data);
  }
}

export default UnauthorizedException;
