import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  res.on("finish", () => {
    if (req.body && req.body.query) {
      const operationName = req.body.operationName || "UnknownOperation";
      console.log(
        `[${new Date().toISOString()}] GraphQL Request: ${operationName} - ${res.statusCode} (${Date.now() - startTime}ms)`
      );
    }
  });

  next();
};
