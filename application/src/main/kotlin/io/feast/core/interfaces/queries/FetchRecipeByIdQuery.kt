package io.feast.core.interfaces.queries

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe

interface FetchRecipeByIdQuery {
    fun execute(id: String): Either<Exception, Option<Recipe>>
}