package io.feast.core.interfaces.queries

import arrow.core.Option
import io.feast.core.domain.Recipe

interface FetchAllRecipesQuery {
    fun execute(): Option<List<Recipe>>
}