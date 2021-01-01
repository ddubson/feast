import { Pool } from 'pg';
import PgRecipeStore from './store/pg/PgRecipeStore';
import { pgPool } from './store/pg/PgConfig';
import { RecipeStore } from './store/RecipeStore';
import {UserAccountStore} from "./store/UserAccountStore";
import PgUserAccountStore from "./store/pg/PgUserAccountStore";

const environmentConfig = {
  dbConnectionString: process.env.PG_CONNECTION_STRING,
};

const db: Pool = pgPool(environmentConfig.dbConnectionString);

const recipeStore: RecipeStore = new PgRecipeStore(db);

const userAccountStore: UserAccountStore = new PgUserAccountStore(db);

export { recipeStore, userAccountStore };
