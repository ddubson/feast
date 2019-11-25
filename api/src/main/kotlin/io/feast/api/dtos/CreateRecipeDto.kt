package io.feast.api.dtos

data class IngredientDto(val name: String, val form: String, val quantity: QuantityDto, val weight: WeightDto)

data class CreateRecipeDto(val name: String, val ingredients: List<IngredientDto>?)