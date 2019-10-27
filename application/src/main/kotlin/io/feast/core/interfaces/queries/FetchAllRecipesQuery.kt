package io.feast.core.interfaces.queries

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe

interface FetchAllRecipesQuery {
    fun execute(): Either<Exception, Option<List<Recipe>>>
}