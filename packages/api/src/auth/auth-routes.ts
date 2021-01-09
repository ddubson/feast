import {Express, Request, Response} from "express";
import passport from "passport";
import logger from "../logger-config";

const enum Routes {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register"
}

export const authRoutes = (app: Express): void => {
  app.post(Routes.LOGIN, (req: Request, res: Response, next) => {
    return passport.authenticate('local-login', (error, token, userData) => {
      if (error) {
        if (error.name === 'IncorrectCredentialsError') {
          return res.status(400).json({success: false, message: error.message});
        }

        return res.status(400).json({
          success: false,
          message: "Unable to process login attempt."
        })
      }

      return res.json({
        success: true,
        message: "Login successful.",
        token,
        user: userData
      })
    })(req, res, next);
  });

  app.post(Routes.REGISTER, (req: Request, res: Response, next) => {
    return passport.authenticate('local-register', (err) => {
      if (err) {
        if(err.name === "Unforeseen error.") {
          return res.status(500).json({
            success: false,
            message: 'Could not process registration.'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Could not process the form.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'You have successfully registered!'
      });
    })(req, res, next)
  });
};
