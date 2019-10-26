package io.feast.core.base

import arrow.core.Option
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchAllRecipesQuery

class BaseFetchAllRecipesQuery: FetchAllRecipesQuery {
    override fun execute(): Option<List<Recipe>> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}