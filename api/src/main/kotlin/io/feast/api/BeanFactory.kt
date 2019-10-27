package io.feast.api

import io.feast.core.base.queries.BaseFetchAllRecipesQuery
import io.feast.core.base.queries.BaseFetchRecipeByIdQuery
import io.feast.core.base.repositories.InMemoryRecipeRepository
import io.feast.core.interfaces.queries.FetchAllRecipesQuery
import io.feast.core.interfaces.queries.FetchRecipeByIdQuery
import io.feast.core.interfaces.repositories.RecipeRepository
import io.micronaut.context.annotation.Factory
import javax.inject.Singleton

@Factory
internal class BeanFactory {
    @Singleton
    fun recipeRepository(): RecipeRepository = InMemoryRecipeRepository()

    @Singleton
    fun fetchAllRecipesQuery(recipeRepository: RecipeRepository): FetchAllRecipesQuery =
            BaseFetchAllRecipesQuery(recipeRepository)

    @Singleton
    fun fetchRecipeByIdQuery(recipeRepository: RecipeRepository): FetchRecipeByIdQuery =
            BaseFetchRecipeByIdQuery(recipeRepository)
}