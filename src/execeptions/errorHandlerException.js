import HttpException from "./HttpException.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      type: "error",
      statusCode: err.statusCode,
      message: err.message,
      data: err.data,
      path: req.originalUrl, // Add the path for extra context
    });
  }

  // Handle other unexpected errors
  res.status(500).json({
    type: "error",
    statusCode: 500,
    message: "Internal Server Error",
    path: req.originalUrl,
  });
};

export default errorHandler;
