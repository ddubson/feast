package io.feast.core.interfaces.commands

import arrow.core.Either
import arrow.core.Option
import io.feast.core.domain.Recipe
import io.feast.core.interfaces.commands.requests.CreateRecipeRequest
import java.lang.Exception

interface CreateRecipeCommand {
    fun execute(createRecipeRequest: CreateRecipeRequest): Either<Exception, Option<Recipe>>
}