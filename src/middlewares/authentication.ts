import * as express from "express";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

export const expressAuthentication = (
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> => {
  if (securityName === "jwt") {
    const token = request.headers["authorization"]?.split(" ")[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      jwt.verify(token!, SECRET_KEY, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          if (scopes && scopes.length) {
            const userScopes = decoded.scopes || [];
            const hasValidScope = scopes.some((scope) =>
              userScopes.includes(scope)
            );
            if (!hasValidScope) {
              reject(new Error("Invalid scope"));
              return;
            }
          }
          resolve(decoded);
        }
      });
    });
  } else {
    return Promise.reject(new Error("Security definition not found"));
  }
};
