import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {useEffect, useState} from "react";
import * as shortid from "shortid";
import {Recipe} from "@ddubson/feast-domain";
import RecipeListItem from "./components/RecipeListItem";
import {RecipesGateway} from "../../application/gateways/RecipesGateway";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

const NoRecipesYet = <div>No recipes yet.</div>;

const renderRecipes = (maybeRecipes: Maybe<Recipe[]>) =>
  maybeRecipes
    .mapOrDefault((recipes: Recipe[]) =>
        (<>{
          recipes.map((recipe: Recipe) => (<RecipeListItem key={shortid.generate()} recipe={recipe} />))
        }
        </>),
      NoRecipesYet,
    );

function ViewAllRecipes({recipesGateway}: { recipesGateway: RecipesGateway }) {
  const [maybeRecipes, setRecipes] = useState<Maybe<Recipe[]>>(() => (Nothing));

  useEffect(() => {
    recipesGateway.findAll().then((recipes: Recipe[]) => {
      setRecipes(Just(recipes))
    }).catch(() => setRecipes(Nothing));
  }, [recipesGateway]);

  return (
    <div className="recipe-dashboard">
      <div className="recipe-list">
        <h2 className="">Recipes</h2>
        <section>
          <Link to="/recipe/new">
            <Button className="p-button-sm" icon="pi pi-plus" label="New Recipe" />
          </Link>
        </section>
        <section className="p-d-flex">
          {renderRecipes(maybeRecipes)}
        </section>
      </div>
    </div>
  );
}

export default ViewAllRecipes;
