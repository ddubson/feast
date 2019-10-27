package io.feast.core.base.repositories

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.repositories.RecipeRepository

class InMemoryRecipeRepository : RecipeRepository {
    private val recipes = listOf(Recipe("1"), Recipe("2"), Recipe("3"))

    override fun fetchAll(): Either<Exception, Option<List<Recipe>>> = Either.Right(Option(recipes))
}