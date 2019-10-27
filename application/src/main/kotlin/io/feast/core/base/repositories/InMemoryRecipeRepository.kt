package io.feast.core.base.repositories

import arrow.core.Either
import arrow.core.Option
import arrow.core.firstOrNone
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.repositories.RecipeRepository

val ingredients = listOf(
        Ingredient("1", "Potato", "Whole", "1")
)

val recipes = listOf(
        Recipe("1", "Potato Salad", ingredients),
        Recipe("2", "French Fries", ingredients),
        Recipe("3", "Mashed Potatoes", ingredients)
)

class InMemoryRecipeRepository : RecipeRepository {
    override fun fetchById(id: String): Either<Exception, Option<Recipe>> = Either.Right(
            recipes.firstOrNone { it.id == id }
    )

    override fun fetchAll(): Either<Exception, Option<List<Recipe>>> = Either.Right(
            Option(recipes)
    )
}