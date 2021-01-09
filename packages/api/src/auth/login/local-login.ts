import {Strategy} from "passport-local";
import {Maybe} from "purify-ts/Maybe";
import {sign} from "jsonwebtoken";
import {compare} from "bcryptjs";
import {userAccountStore} from "../../config";
import {jwtSecret} from "../auth-config";
import {UserAccount} from "../../store/UserAccountStore";

const incorrectCredentialsError = () => {
  const error = new Error("Incorrect email or password");
  error.name = 'IncorrectCredentialsError';
  return error;
}

const comparePassword = (userProvidedPassword: string,
                         storedPassword: string,
                         onCompareDone: (passwordErr: Error, isMatch: boolean) => void) => {
  compare(userProvidedPassword, storedPassword, onCompareDone);
};

const localLoginStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  userAccountStore.findByEmail(userData.email).then((userAccountResult: Maybe<UserAccount>) => {
    if (userAccountResult.isNothing()) {
      return done(incorrectCredentialsError());
    } else {
      const userAccount = userAccountResult.extract();
      comparePassword(userData.password, userAccount.passwordHash, (passwordErr, isMatch) => {
        if (!isMatch) {
          return done(incorrectCredentialsError());
        }
        const token = sign({sub: userAccount.email}, jwtSecret);

        const data = {
          name: userAccount.email,
          message: "Logged in."
        };

        return done(null, token, data);
      })
    }
  });
});

export default localLoginStrategy;
