package io.feast.api

import arrow.core.Either
import arrow.core.None
import arrow.core.Option
import arrow.core.Some
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Quantity
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.queries.FetchAllRecipesQuery
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpStatus
import io.micronaut.http.client.RxHttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.http.client.exceptions.HttpClientResponseException
import io.micronaut.test.annotation.MicronautTest
import io.micronaut.test.annotation.MockBean
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import javax.inject.Inject

@MicronautTest
class FetchAllRecipesControllerTest {
    @MockBean(FetchAllRecipesQuery::class)
    fun fetchAllRecipesQuery(): FetchAllRecipesQuery = StubFetchAllRecipesQuery()

    @Inject
    lateinit var fetchAllRecipesQuery: FetchAllRecipesQuery;

    @field:Client("/")
    @Inject
    lateinit var httpClient: RxHttpClient

    @Test
    fun whenInvoked_ShouldReturnAllRecipesInTheApplication() {
        val expectedRecipes = listOf(
                Recipe("1", "Potato", listOf(
                        Ingredient("1", "Potato", "Chopped", Some(Quantity(1f)), None))
                )
        )
        (fetchAllRecipesQuery as StubFetchAllRecipesQuery).allRecipes = expectedRecipes

        val response = httpClient.toBlocking()
                .retrieve(HttpRequest.GET<List<Recipe>>("/api/recipes"), Array<Recipe>::class.java)
        assertIterableEquals((fetchAllRecipesQuery as StubFetchAllRecipesQuery).allRecipes, response.asList())
    }

    @Test
    fun whenInvoked_AndApplicationHasNoRecipes_ShouldReturnNoRecipesFoundMessage() {
        (fetchAllRecipesQuery as StubFetchAllRecipesQuery).allRecipes = emptyList()

        val exc = assertThrows<HttpClientResponseException> {
            httpClient.toBlocking().exchange("/api/recipes",
                    String::class.java, HttpStatus.NOT_FOUND::class.java)
        }
        assertEquals(HttpStatus.NOT_FOUND, exc.status)
        assertEquals("No recipes found.", exc.message)
    }
}

class StubFetchAllRecipesQuery : FetchAllRecipesQuery {
    lateinit var allRecipes: List<Recipe>

    override fun execute(): Either<Exception, Option<List<Recipe>>> =
            Either.Right(if (allRecipes.isNotEmpty()) Some(allRecipes) else None)
}