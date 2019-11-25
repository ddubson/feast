package io.feast.core.interfaces.commands.requests

data class WeightRequest(val weight: Float,
                         val weightType: String)

data class QuantityRequest(val quantity: Float)

data class CreateIngredientRequest(val name: String, val form: String,
                                   val quantity: QuantityRequest,
                                   val weight: WeightRequest)

data class CreateRecipeRequest(val name: String, val ingredients: List<CreateIngredientRequest>)