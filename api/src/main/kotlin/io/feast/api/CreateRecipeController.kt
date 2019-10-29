package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Some
import io.feast.api.dtos.CreateRecipeDto
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.commands.CreateRecipeCommand
import io.feast.core.interfaces.commands.requests.CreateIngredientRequest
import io.feast.core.interfaces.commands.requests.CreateRecipeRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post

@Controller("/api")
class CreateRecipeController(private val createRecipeCommand: CreateRecipeCommand) {
    @Post("/recipes")
    public fun createRecipe(@Body newRecipe: CreateRecipeDto): HttpResponse<*> {
        val createRecipeRequest = newRecipe.let {
            CreateRecipeRequest(it.name, ingredients = it.ingredients.map { ingredient ->
                CreateIngredientRequest(ingredient.name, ingredient.form, ingredient.quantity)
            })
        }
        return when (val result = createRecipeCommand.execute(createRecipeRequest)) {
            is Either.Right -> when (result.b) {
                is None -> HttpResponse.serverError("No entity to return after creation.")
                is Some -> HttpResponse.created((result.b as Some<Recipe>).t)
            }
            is Either.Left -> HttpResponse.serverError("Unable to create recipe.")
        }
    }

}