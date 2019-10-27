package io.feast.core.interfaces.repositories

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe

interface RecipeRepository {
    fun fetchAll(): Either<Exception, Option<List<Recipe>>>

    fun fetchById(id: String): Either<Exception, Option<Recipe>>
}