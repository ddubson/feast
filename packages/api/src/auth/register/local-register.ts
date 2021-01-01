import {UserAccount} from "../../store/UserAccountStore";
import {WithoutId} from "@ddubson/feast-domain";
import {genSalt, hash} from "bcryptjs";
import {userAccountStore} from "../../config";
import {Strategy} from "passport-local";

const localRegisterStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  hashPassword(password.trim(), (hashedPassword) => {
    const newUserAccount: WithoutId<UserAccount> = {
      email: email.trim(),
      passwordHash: hashedPassword,
    };
    userAccountStore.save(newUserAccount).then((userAccount: UserAccount) => {
      return done(null);
    }).catch((error) => {
      console.error("Registration issue: ", error);
      done({name: "Unforeseen error."});
    })
  });
});

const hashPassword = (rawPassword: string, onHashDone: (hashedPassword: string) => void) => {
  genSalt((saltError, salt) => {
    if (saltError) {
      throw new Error("Salt generation error")
    }

    hash(rawPassword, salt, (hashError, hash) => {
      if (hashError) {
        throw new Error("Hashing error.")
      }

      onHashDone(hash);
    })
  })
}

export default localRegisterStrategy;
