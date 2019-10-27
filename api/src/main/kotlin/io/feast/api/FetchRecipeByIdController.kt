package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Some
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchRecipeByIdQuery
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller
class FetchRecipeByIdController(private val fetchRecipeByIdQuery: FetchRecipeByIdQuery) {
    @Get("/recipes/{id}", produces = [MediaType.APPLICATION_JSON])
    public fun fetchRecipeById(id: String): HttpResponse<*> =
            when (val result = fetchRecipeByIdQuery.execute(id)) {
                is Either.Right -> when (result.b) {
                    is None -> HttpResponse.notFound("Recipe not found.")
                    is Some -> HttpResponse.ok((result.b as Some<Recipe>).t)
                }
                is Either.Left -> HttpResponse.serverError("Something went wrong!")
            }
}