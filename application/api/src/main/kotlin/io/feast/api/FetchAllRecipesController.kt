package io.feast.api

import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller
class FetchAllRecipesController {
    @Get("/", produces = [MediaType.TEXT_PLAIN])
    fun index(): String {
        return "Hello World!"
    }
}