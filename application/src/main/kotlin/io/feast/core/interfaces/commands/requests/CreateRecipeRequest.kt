package io.feast.core.interfaces.commands.requests

data class CreateIngredientRequest(val name: String, val form: String, val quantity: Int)

data class CreateRecipeRequest(val name: String, val ingredients: List<CreateIngredientRequest>)