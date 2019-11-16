import * as React from "react";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import RecipeListItem from "../components/RecipeListItem";
import {DIContainerContext} from "../../AppConfig";
import {RecipesObserver} from "../../application/services/RecipesService";
import {Recipe} from "../../application/types";
import {Just, Maybe, Nothing} from "purify-ts/Maybe";

interface State {
  recipes: Maybe<Recipe[]>;
}

const renderRecipes = (recipes: Maybe<Recipe[]>) => {
  return recipes
    .mapOrDefault((recipes: Recipe[]) =>
        (<React.Fragment>{
          recipes.map((recipe: Recipe) => (<RecipeListItem key={shortid.generate()} recipe={recipe}/>))
        }
        </React.Fragment>),
      (<div>No recipes yet.</div>)
    );
};

class RecipesDashboardScene extends React.PureComponent<{}, State> implements RecipesObserver {
  public static contextType = DIContainerContext;
  public context!: React.ContextType<typeof DIContainerContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      recipes: Nothing,
    };
  }

  public componentDidMount(): void {
    this.context.recipesService.registerObserver(this);
    this.context.recipesService.dispatch();
  }

  public componentWillUnmount(): void {
    this.context.recipesService.unregisterObserver(this);
  }

  public render() {
    const {recipes} = this.state;

    return (
      <div className="recipe-dashboard">
        <div>
          <button>
            <Link to={"/create-recipe"} data-create-recipe-link>Create Recipe</Link>
          </button>
        </div>
        <div className="recipe-list">
          <div className="recipe-list-header">
            <h2>
              Recipes
            </h2>
          </div>
          {renderRecipes(recipes)}
        </div>
      </div>
    );
  }

  public receivedRecipes(recipes: Recipe[]): void {
    this.setState({recipes: Just(recipes)});
  }

  public receivedNoRecipes(): void {
    this.setState({recipes: Nothing});
  }
}

export default RecipesDashboardScene;
