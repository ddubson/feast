package io.feast.core.base.queries

import arrow.core.Either
import arrow.core.Option
import io.feast.core.base.repositories.InMemoryRecipeRepository
import io.feast.core.domain.Recipe
import io.kotlintest.fail
import io.kotlintest.matchers.collections.shouldHaveAtLeastSize
import io.kotlintest.shouldBe
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe

object BaseFetchAllRecipesQuerySpec : Spek({
    describe("BaseFetchAllRecipesQuery") {
        val recipeRepository by memoized { InMemoryRecipeRepository() }
        val baseFetchAllRecipesQuery by memoized { BaseFetchAllRecipesQuery(recipeRepository) }

        val someRecipe = Recipe("123", "Some Recipe", emptyList())

        describe("when some recipes exist") {
            beforeEachTest {
                recipeRepository.create(someRecipe)
            }

            describe("and query is invoked") {
                it("should steer right") {
                    val eitherResult: Either<Exception, Option<List<Recipe>>> = baseFetchAllRecipesQuery.execute()
                    eitherResult.isRight() shouldBe true
                    eitherResult.fold({
                        fail("Query returned an error!")
                    }, { optionOfRecipes ->
                        optionOfRecipes.fold({
                            fail("There was no list!")
                        }, { recipes ->
                            recipes shouldHaveAtLeastSize 3
                        })
                    })
                }
            }
        }
    }
})