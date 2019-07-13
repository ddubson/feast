import {injectable} from "inversify";
import {Repository} from "../shared-components/Repository";
import {Recipe} from "./Recipe";

@injectable()
export class RecipesRepository implements Repository<Recipe> {
  public fetchAll(): Recipe[] {
    return [{ id: "1", name: "Example Recipe", ingredients: []}];
  }

  public findById(id: number): Recipe {
    return { id: "1", ingredients: [], name: ""};
  }
}
