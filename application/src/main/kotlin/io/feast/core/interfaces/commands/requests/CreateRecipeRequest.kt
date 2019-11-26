package io.feast.core.interfaces.commands.requests

data class WeightRequest(val weight: Float,
                         val weightType: String) {
    companion object {
        fun identity() = WeightRequest(0f, "NONE")
    }
}

data class QuantityRequest(val quantity: Float) {
    companion object {
        fun identity() = QuantityRequest(0f)
    }
}

data class CreateIngredientRequest(val name: String, val form: String,
                                   val quantity: QuantityRequest,
                                   val weight: WeightRequest)

data class CreateRecipeRequest(val name: String, val ingredients: List<CreateIngredientRequest>)