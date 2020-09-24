import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as shortid from "shortid";
import {FetchAllRecipesObserver, FetchAllRecipesService} from "../../application/services/Services";
import {Recipe} from "../../../../domain/src/types";
import RecipeListItem from "./components/RecipeListItem";

const NoRecipesYet = <>
  <div>No recipes yet.</div>
</>;

const renderRecipes = (maybeRecipes: Maybe<Recipe[]>) =>
  maybeRecipes
    .mapOrDefault((recipes: Recipe[]) =>
        (<React.Fragment>{
          recipes.map((recipe: Recipe) => (<RecipeListItem key={shortid.generate()} recipe={recipe} />))
        }
        </React.Fragment>),
      NoRecipesYet,
    );

function RecipesDashboardScene({recipesService}: { recipesService: FetchAllRecipesService }) {
  const [maybeRecipes, setRecipes] = useState<Maybe<Recipe[]>>(() => (Nothing));
  const [observer] = useState<FetchAllRecipesObserver>({
    receivedNoRecipes(): void {
      setRecipes(Nothing);
    },
    receivedRecipes(recipes: Recipe[]): void {
      setRecipes(Just(recipes));
    },
  });

  useEffect(() => {
    recipesService.registerObserver(observer);
    recipesService.dispatch();

    return function cleanup() {
      recipesService.unregisterObserver(observer);
    };
  }, [observer]);

  return (
    <div className="recipe-dashboard">
      <div className="recipe-list">
        <h2 className="ui header">Recipes</h2>
        {renderRecipes(maybeRecipes)}
      </div>
    </div>
  );
}

export default RecipesDashboardScene;
