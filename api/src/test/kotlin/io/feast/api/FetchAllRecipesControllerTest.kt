package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchAllRecipesQuery
import io.micronaut.context.annotation.Primary
import io.micronaut.http.HttpRequest
import io.micronaut.http.client.RxHttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.test.annotation.MicronautTest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test
import javax.inject.Inject
import javax.inject.Singleton

@MicronautTest
class FetchAllRecipesControllerTest(@Client("/") val httpClient: RxHttpClient) {
    @Inject
    lateinit var stubFetchAllRecipesQuery: StubFetchAllRecipesQuery

    @Test
    fun whenInvoked_ShouldReturnAllRecipesInTheApplication() {
        val expectedRecipes = listOf(
                Recipe("1", "Potato", listOf(
                        Ingredient("1", "Potato", "Chopped", 1))
                )
        )
        stubFetchAllRecipesQuery.allRecipes = expectedRecipes

        val response = httpClient.toBlocking()
                .retrieve(HttpRequest.GET<List<Recipe>>("/recipes"), Array<Recipe>::class.java)
        assertIterableEquals(stubFetchAllRecipesQuery.allRecipes, response.asList())
    }

    @Test
    fun whenInvoked_AndApplicationHasNoRecipes_ShouldReturnNoRecipesFoundMessage() {
        stubFetchAllRecipesQuery.allRecipes = emptyList()

        val response = httpClient.toBlocking().exchange("/recipes", String::class.java)
        assertEquals(404, response.code())
        assertEquals("No recipes found.", response.reason())
    }
}

@Primary
@Singleton
class StubFetchAllRecipesQuery : FetchAllRecipesQuery {
    lateinit var allRecipes: List<Recipe>

    override fun execute(): Either<Exception, Option<List<Recipe>>> =
            Either.Right(if (allRecipes.isNotEmpty()) Some(allRecipes) else None)
}