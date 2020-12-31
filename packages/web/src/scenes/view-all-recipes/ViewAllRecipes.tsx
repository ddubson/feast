import {Just, Maybe, Nothing} from "purify-ts/Maybe";
import React, {useContext, useEffect, useState} from "react";
import * as shortid from "shortid";
import {Recipe} from "@ddubson/feast-domain";
import RecipeListItem from "./components/RecipeListItem";
import {RecipesGateway} from "../../application/gateways/RecipesGateway";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {store} from "../../application/Store";

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
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    recipesGateway.findAll().then((recipes: Recipe[]) => {
      setRecipes(Just(recipes))
    }).catch(() => setRecipes(Nothing));
  }, [recipesGateway]);


  return (
    <div className="recipe-dashboard">
      <section className="p-mt-2">
        <Link to="/recipe/new">
          <Button className="p-button-sm" icon="pi pi-plus" label="New Recipe" />
        </Link>
      </section>

      <section>
        Color: {state.color}
        <Button onClick={() => dispatch!({ type: "UPDATE_COLOR" })} label={"Update Color"} />
      </section>

      <h2 className="p-mt-2">Recipes</h2>
      <section className="p-mt-2 p-d-flex">
        {renderRecipes(maybeRecipes)}
      </section>
    </div>
  );
}

export default ViewAllRecipes;
