package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import io.feast.api.dtos.CreateRecipeDto
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
    public fun createRecipe(@Body newRecipe: CreateRecipeDto): HttpResponse<*> {
        val createRecipeRequest = newRecipe.let { createRecipeDto ->
            CreateRecipeRequest(
                    createRecipeDto.name,
                    ingredients = Option.fromNullable(createRecipeDto.ingredients)
                            .fold(
                                    ifEmpty = { emptyList<CreateIngredientRequest>() },
                                    ifSome = { ingredients ->
                                        ingredients.map {
                                            CreateIngredientRequest(
                                                    it.name,
                                                    it.form,
                                                    QuantityRequest(it.quantity.value),
                                                    it.weight.let { weight ->
                                                        WeightRequest(weight.value, weight.type)
                                                    })
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