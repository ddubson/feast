package io.feast.core.base.commands

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Quantity
import io.feast.core.domain.Recipe
import io.feast.core.domain.Weight
import io.feast.core.domain.WeightType
import io.feast.core.interfaces.commands.CreateRecipeCommand
import io.feast.core.interfaces.commands.requests.CreateRecipeRequest
import io.feast.core.interfaces.repositories.RecipeRepository
import java.util.*

class BaseCreateRecipeCommand(private val recipeRepository: RecipeRepository) : CreateRecipeCommand {
    override fun execute(createRecipeRequest: CreateRecipeRequest): Either<Exception, Option<Recipe>> =
            recipeRepository.create(
                    createRecipeRequest.let { recipeRequest ->
                        Recipe(UUID.randomUUID().toString(),
                                recipeRequest.name,
                                ingredients = recipeRequest.ingredients.map { ingredient ->
                                    Ingredient(UUID.randomUUID().toString(),
                                            ingredient.name,
                                            ingredient.form,
                                            Option.fromNullable(ingredient.quantity).fold(
                                                    { None },
                                                    { Some(Quantity(it.quantity)) }
                                            ),
                                            Option.fromNullable(ingredient.weight).fold(
                                                    { None },
                                                    {
                                                        Some(Weight(it.weight,
                                                                WeightType.valueOf(it.weightType)))
                                                    }
                                            )
                                    )
                                })
                    }
            )
}