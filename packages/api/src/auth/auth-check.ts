import {Request, Response} from "express";
import {jwtSecret} from "./auth-config";
import {verify} from "jsonwebtoken";
import {userAccountStore} from "../config";
import {UserAccount} from "../store/UserAccountStore";
import {Maybe} from "purify-ts/Maybe";

const authCheckMiddleware = (req: Request & { userAccount: UserAccount }, res: Response, next: Function) => {
  if(!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return verify(token, jwtSecret, (err, decoded: { sub: string }) => {
    if(err) { return res.status(401).end(); }

    const email = decoded.sub;

    userAccountStore.findByEmail(email).then((userAccount: Maybe<UserAccount>) => {
      if(userAccount.isNothing()) {
        return res.status(401).end();
      }

      req.userAccount = userAccount.extract();
      return next();
    });
  });
}

export default authCheckMiddleware;
