import PgRecipeStore from "./store/pg/PgRecipeStore";
import {pgPool} from "./store/pg/PgConfig";
import {Pool} from "pg";
import {RecipeStore} from "./store/RecipeStore";

const environmentConfig = {
  dbConnectionString: process.env.PG_CONNECTION_STRING
}

const db: Pool = pgPool(environmentConfig.dbConnectionString);

const recipeStore: RecipeStore = new PgRecipeStore(db);

export {recipeStore};
