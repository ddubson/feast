import { config as dotEnvConfig } from "dotenv";
import {Express, NextFunction, Request, Response} from "express";
import { Container } from "inversify";
import "reflect-metadata";
import {Recipe} from "../recipes/Recipe";
import {RecipesRepository} from "../recipes/RecipesRepository";
import {Repository} from "../shared-components/Repository";

dotEnvConfig();

export const allowCrossOriginHeaders = (app: Express): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};

const iocContainer = new Container();
iocContainer.bind<Repository<Recipe>>("RecipesRepository").to(RecipesRepository);

export { iocContainer };
