import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { StringValue } from "ms";

export const createToken = (payload: object, secret: Secret, expiresIn: StringValue) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = <T extends JwtPayload>(token: string, secret: Secret) => {
  return jwt.verify(token, secret) as T;
};
