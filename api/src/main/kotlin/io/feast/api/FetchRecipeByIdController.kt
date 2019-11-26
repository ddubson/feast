package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import arrow.core.getOrElse
import io.feast.api.dtos.fromRecipe
import io.feast.core.domain.Quantity
import io.feast.core.domain.Recipe
import io.feast.core.domain.Weight
import io.feast.core.interfaces.queries.FetchRecipeByIdQuery
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/api")
class FetchRecipeByIdController(private val fetchRecipeByIdQuery: FetchRecipeByIdQuery) {
    @Get("/recipes/{id}", produces = [MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN])
    public fun fetchRecipeById(id: String, text: Boolean? = false): HttpResponse<*> =
            when (val result = fetchRecipeByIdQuery.execute(id)) {
                is Either.Right -> when (result.b) {
                    is None -> HttpResponse.notFound("Recipe not found.")
                    is Some -> {
                        val someRecipe = (result.b as Some<Recipe>)
                        if (Option.fromNullable(text).nonEmpty()) {
                            HttpResponse.ok(asText(someRecipe.t))
                        } else {
                            HttpResponse.ok(fromRecipe(someRecipe.t))
                        }
                    }
                }
                is Either.Left -> HttpResponse.serverError("Something went wrong!")
            }
}

fun asText(recipe: Recipe): String {
    val ingredients = recipe.ingredients.joinToString("\n") { ingredient ->
        val weight = ingredient.weight.getOrElse { Weight.identity() }
        "Ingredient: ${ingredient.name} ${ingredient.form} " +
                "${ingredient.quantity.getOrElse { Quantity.identity() }.value} | " +
                "${weight.value} ${weight.type}"
    }

    return """
*** RECIPE ***
        
${recipe.name.toUpperCase()}
$ingredients
    """
}