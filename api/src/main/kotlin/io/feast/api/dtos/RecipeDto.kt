package io.feast.api.dtos

import arrow.core.getOrElse
import io.feast.core.domain.Ingredient
import io.feast.core.domain.Quantity
import io.feast.core.domain.Recipe
import io.feast.core.domain.Weight

data class WeightDto(val value: Float, val type: String) {
    companion object {
        fun identity(): WeightDto = WeightDto(0f, "NONE")
    }
}

data class QuantityDto(val value: Float)

data class IngredientDto(val id: String,
                         val name: String,
                         val form: String,
                         val quantity: QuantityDto?,
                         val weight: WeightDto?)

data class RecipeDto(val id: String, val name: String, val ingredients: List<IngredientDto>?)

fun fromRecipe(recipe: Recipe): RecipeDto {
    return RecipeDto(
            recipe.id,
            recipe.name,
            ingredients = recipe.ingredients.map { ingredient: Ingredient ->
                IngredientDto(ingredient.id,
                        ingredient.name,
                        ingredient.form,
                        ingredient.quantity.getOrElse { Quantity.identity() }
                                .let { QuantityDto(it.value) },
                        ingredient.weight.getOrElse { Weight.identity() }
                                .let { WeightDto(it.value, it.type.toString()) }
                )
            }
    )
}