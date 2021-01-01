import {UserAccount, UserAccountStore} from "../UserAccountStore";
import {Pool} from "pg";
import {Nothing} from "purify-ts";
import {Maybe} from "purify-ts/Maybe";
import {WithoutId} from "@ddubson/feast-domain";

class PgUserAccountStore implements UserAccountStore {
  constructor(private db: Pool) {
  }

  findByEmail(email: string): Promise<Maybe<UserAccount>> {
    return Promise.resolve(Nothing);
  }

  save(userAccount: WithoutId<UserAccount>): Promise<UserAccount> {
    return Promise.reject();
  }
}

export default PgUserAccountStore;
