package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import io.feast.api.dtos.RecipeDto
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.commands.CreateRecipeCommand
import io.feast.core.interfaces.commands.requests.CreateIngredientRequest
import io.feast.core.interfaces.commands.requests.CreateRecipeRequest
import io.feast.core.interfaces.commands.requests.QuantityRequest
import io.feast.core.interfaces.commands.requests.WeightRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post

@Controller("/api")
class CreateRecipeController(private val createRecipeCommand: CreateRecipeCommand) {
    @Post("/recipes")
    public fun createRecipe(@Body newRecipe: RecipeDto): HttpResponse<*> {
        val createRecipeRequest = newRecipe.let { recipeDto ->
            CreateRecipeRequest(
                    recipeDto.name,
                    ingredients = Option.fromNullable(recipeDto.ingredients)
                            .fold(
                                    ifEmpty = { emptyList<CreateIngredientRequest>() },
                                    ifSome = { ingredients ->
                                        ingredients.map {
                                            CreateIngredientRequest(
                                                    it.name,
                                                    it.form,
                                                    it.quantity?.let { quantityDto ->
                                                        QuantityRequest(quantityDto.value)
                                                    } ?: QuantityRequest.identity(),
                                                    it.weight?.let { weight ->
                                                        WeightRequest(weight.value, weight.type)
                                                    } ?: WeightRequest.identity())
                                        }
                                    }))
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