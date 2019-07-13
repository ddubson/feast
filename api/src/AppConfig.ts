import {Express, NextFunction, Request, Response} from "express";

import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

export const allowCrossOriginHeaders = (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};
