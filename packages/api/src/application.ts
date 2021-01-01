import express, { Request, Response } from 'express';
import * as path from 'path';
import cors from 'cors';
import {apiRoutes} from './router';
import logger from "./logger-config";
import {authRoutes} from "./auth/auth-routes";
import passport from "passport";
import authCheckMiddleware from "./auth/auth-check";
import localLoginStrategy from "./auth/login/local-login";
import localRegisterStrategy from "./auth/register/local-register";

const app = express();

app.use(express.static(path.join(__dirname, 'dist/')));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(passport.initialize());
passport.use('local-login', localLoginStrategy);
passport.use('local-register', localRegisterStrategy);
app.use('/api', authCheckMiddleware);

apiRoutes(app);
authRoutes(app);

app.get('*', (request: Request, response: Response) => {
  response.sendFile(path.join(`${__dirname}/index.html`));
});

const port = process.env.PORT || 8080;
app.listen(port);

logger.info(`App is listening on port ${port}`);
