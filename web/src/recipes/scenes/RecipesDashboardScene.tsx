import {Button, Typography} from "@material-ui/core";
import * as React from "react";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import {Recipe} from "../../shared-components/recipe";
import RecipeListItem from "../components/RecipeListItem";
import {DIContainerContext} from "../../AppConfig";

interface State {
  recipes: Recipe[];
}

const renderRecipes = (recipes: Recipe[]) => {
  if (recipes.length === 0) {
    return ("No recipes yet.");
  }

  return recipes.map((recipe: Recipe) =>
    <RecipeListItem key={shortid.generate()} recipe={recipe} />);
};

class RecipesDashboardScene extends React.PureComponent<{}, State> {
  public static contextType = DIContainerContext;
  public context!: React.ContextType<typeof DIContainerContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  public componentDidMount(): void {
    this.context.recipesGateway.findAll().then((recipes: Recipe[]) => {
      this.setState({recipes});
    });
  }

  public render() {
    const {recipes} = this.state;

    return (
      <div className="recipe-dashboard">
        <div>
          <Button variant="outlined">
            <Link to={"/create-recipe"} data-create-recipe-link>Create Recipe</Link>
          </Button>
        </div>
        <div className="recipe-list">
          <div className="recipe-list-header">
            <Typography variant="h5" component="h2" gutterBottom>
              Recipes
            </Typography>
          </div>
          {renderRecipes(recipes)}
        </div>
      </div>
    );
  }
}

export default RecipesDashboardScene;
