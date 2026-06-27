import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const validateRequest =
  (schema: ZodTypeAny) => async (req: Request, _res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  };

export default validateRequest;
