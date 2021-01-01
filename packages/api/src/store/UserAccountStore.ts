import {Maybe} from "purify-ts/Maybe";
import {WithoutId} from "@ddubson/feast-domain";

export type UserAccount = {
  id: string;
  email: string;
  passwordHash: string;
}

export type UserAccountStore = {
  findByEmail: (email: string) => Promise<Maybe<UserAccount>>;

  save: (userAccount: WithoutId<UserAccount>) => Promise<UserAccount>;
}
