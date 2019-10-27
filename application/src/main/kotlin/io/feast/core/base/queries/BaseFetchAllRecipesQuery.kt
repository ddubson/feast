package io.feast.core.base.queries

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchAllRecipesQuery
import io.feast.core.interfaces.repositories.RecipeRepository

class BaseFetchAllRecipesQuery(private val recipeRepository: RecipeRepository) : FetchAllRecipesQuery {
    override fun execute(): Either<Exception,  Option<List<Recipe>>> = recipeRepository.fetchAll()
}