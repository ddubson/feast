package io.feast.core.base.commands

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.commands.CreateRecipeCommand
import io.feast.core.interfaces.commands.requests.CreateRecipeRequest
import io.feast.core.interfaces.repositories.RecipeRepository
import java.util.*

class BaseCreateRecipeCommand(private val recipeRepository: RecipeRepository) : CreateRecipeCommand {
    override fun execute(createRecipeRequest: CreateRecipeRequest): Either<Exception, Option<Recipe>> =
            recipeRepository.create(
                    createRecipeRequest.let {
                        Recipe(UUID.randomUUID().toString(), it.name, ingredients = it.ingredients.map { ingredient ->
                            Ingredient(UUID.randomUUID().toString(), ingredient.name, ingredient.form, ingredient.quantity)
                        })
                    }
            )
}