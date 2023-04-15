const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class NotFound extends BaseError {
  constructor({
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    message = "Not found this resource.",
  }) {
    super(statusCode, message, isOperational);
  }
}

class BadReqest extends BaseError {
  constructor({
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true,
    message = "Bad request.",
  }) {
    super(statusCode, isOperational, message);
  }
}

module.exports = { NotFound, BadReqest };
