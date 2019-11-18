import * as React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import RecipeListItem from "../components/RecipeListItem";
import {RecipesObserver, RecipesService} from "../../application/services/RecipesService";
import {Recipe} from "../../application/types";
import {Just, Maybe, Nothing} from "purify-ts/Maybe";

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

function RecipesDashboardScene({recipesService}: { recipesService: RecipesService }) {
  const [maybeRecipes, setRecipes] = useState<Maybe<Recipe[]>>(() => (Nothing));

  const recipeObserver: RecipesObserver = {
    receivedNoRecipes(): void {
      setRecipes(Nothing);
    },
    receivedRecipes(recipes: Array<Recipe>): void {
      setRecipes(Just(recipes));
    }
  };

  useEffect(() => {
    recipesService.registerObserver(recipeObserver);
    recipesService.dispatch();

    return function cleanup() {
      recipesService.unregisterObserver(recipeObserver);
    }
  });

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
        {renderRecipes(maybeRecipes)}
      </div>
    </div>
  );
}

export default RecipesDashboardScene;
