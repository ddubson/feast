import {UserAccount, UserAccountStore} from "../UserAccountStore";
import {Pool, QueryResult} from "pg";
import {Maybe} from "purify-ts/Maybe";
import {WithoutId} from "@ddubson/feast-domain";

class PgUserAccountStore implements UserAccountStore {
  constructor(private db: Pool) {
  }

  findByEmail(email: string): Promise<Maybe<UserAccount>> {
    const query = {
      text: "SELECT id, email, passwordHash FROM user_accounts WHERE email = $1",
      values: [email]
    }

    return this.db.query(query)
      .then((result: QueryResult) => {
        const [userAccount] = result.rows;
        return Maybe.fromNullable(userAccount).map(u => {
          return ({
            id: u.id,
            email: u.email,
            passwordHash: u.passwordhash
          });
        });
      })
      .catch((error) => error);
  }

  save(userAccount: WithoutId<UserAccount>): Promise<UserAccount> {
    const query = {
      text: "INSERT INTO user_accounts (email, passwordhash) VALUES ($1, $2) RETURNING id, email, passwordhash",
      values: [userAccount.email, userAccount.passwordHash],
    };

    return this.db.query(query).then(result => {
      const [createdUserAccount] = result.rows;
      return createdUserAccount;
    }).catch(error => error);
  }
}

export default PgUserAccountStore;
