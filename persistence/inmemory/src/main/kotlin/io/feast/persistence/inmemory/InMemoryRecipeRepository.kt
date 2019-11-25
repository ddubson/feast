package io.feast.persistence.inmemory

import arrow.core.Either
import arrow.core.Option
import arrow.core.firstOrNone
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.repositories.RecipeRepository
import java.util.*

val ingredients = mutableListOf(
        Ingredient(UUID.randomUUID().toString(), "Potato", "Whole", 1)
)

val recipes = mutableListOf<Recipe>(
        Recipe(UUID.randomUUID().toString(), "Potato Salad", ingredients),
        Recipe(UUID.randomUUID().toString(), "French Fries", ingredients),
        Recipe(UUID.randomUUID().toString(), "Mashed Potatoes", ingredients)
)

class InMemoryRecipeRepository : RecipeRepository {
    override fun create(recipe: Recipe): Either<Exception, Option<Recipe>> {
        recipes.add(recipe)
        return Either.Right(Option.just(recipe))
    }

    override fun fetchById(id: String): Either<Exception, Option<Recipe>> = Either.Right(
            recipes.firstOrNone { it.id == id }
    )

    override fun fetchAll(): Either<Exception, Option<List<Recipe>>> = Either.Right(
            Option(recipes)
    )
}