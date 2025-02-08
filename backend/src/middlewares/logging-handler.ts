import { RequestHandler } from "express";

export const loggingHandler: RequestHandler = (req, res, next) => {
  const start = Date.now();
  const { method, path, ip } = req;

  // Log request start
  console.log(`[${new Date().toISOString()}] ${method} ${path} - Request received from ${ip}`);

  // Add response finish listener to log the completion
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    
    console.log(
      `[${new Date().toISOString()}] ${method} ${path} - Response sent with status ${status} (${duration}ms)`
    );
  });

  next();
};
