import * as React from "react";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import {Recipe} from "../../shared-components/recipe";
import RecipeListItem from "../components/RecipeListItem";
import {DIContainerContext} from "../../AppConfig";
import {RecipesObserver} from "../services/RecipesService";

interface State {
  recipes: Recipe[];
}

const renderRecipes = (recipes: Recipe[]) => {
  if (recipes.length === 0) {
    return ("No recipes yet.");
  }

  return recipes.map((recipe: Recipe) =>
    <RecipeListItem key={shortid.generate()} recipe={recipe}/>);
};

class RecipesDashboardScene extends React.PureComponent<{}, State> implements RecipesObserver {
  public static contextType = DIContainerContext;
  public context!: React.ContextType<typeof DIContainerContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  receivedRecipes(recipes: Recipe[]): void {
    this.setState({recipes});
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
}

export default RecipesDashboardScene;
