package io.feast.core.base.queries

import arrow.core.Either
import arrow.core.Option
import io.feast.core.base.repositories.InMemoryRecipeRepository
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchRecipeByIdQuery
import io.feast.core.interfaces.repositories.RecipeRepository

class BaseFetchRecipeByIdQuery(private val recipeRepository: RecipeRepository): FetchRecipeByIdQuery {
    override fun execute(id: String): Either<Exception, Option<Recipe>> = recipeRepository.fetchById(id)
}