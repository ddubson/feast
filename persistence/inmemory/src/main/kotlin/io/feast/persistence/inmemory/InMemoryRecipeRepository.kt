package io.feast.persistence.inmemory

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import arrow.core.firstOrNone
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Quantity
import io.feast.core.domain.Recipe
import io.feast.core.domain.Weight
import io.feast.core.domain.WeightType
import io.feast.core.interfaces.repositories.RecipeRepository
import java.util.*

val ingredients = mutableListOf(
        Ingredient(UUID.randomUUID().toString(), "Russet Potatoes",
                "Whole", None, Some(Weight(2f, WeightType.POUNDS))),
        Ingredient(UUID.randomUUID().toString(), "Onion",
                "Medium Size", Some(Quantity(1f)), None)
)

val recipes = mutableListOf(
        Recipe(UUID.randomUUID().toString(), "Potato Pancakes", ingredients)
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