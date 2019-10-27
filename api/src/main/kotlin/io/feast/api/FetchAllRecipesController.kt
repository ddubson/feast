package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Some
import arrow.core.getOrElse
import io.feast.core.interfaces.queries.FetchAllRecipesQuery
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller
class FetchAllRecipesController(private val fetchAllRecipesQuery: FetchAllRecipesQuery) {
    @Get("/", produces = [MediaType.APPLICATION_JSON])
    fun index(): HttpResponse<*> {
        return when (val result = fetchAllRecipesQuery.execute()) {
            is Either.Right -> when(result.b) {
                is None -> HttpResponse.notFound<String>("No recipes to fetch.")
                is Some -> HttpResponse.ok(result.b.getOrElse { None })
            }
            is Either.Left -> HttpResponse.serverError("Something went wrong!")
        }
    }
}