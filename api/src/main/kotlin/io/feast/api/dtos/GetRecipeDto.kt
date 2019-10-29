package io.feast.api.dtos

data class GetIngredientDto(val id: String, val name: String, val form: String, val quantity: Int)

data class GetRecipeDto(val id: String, val name: String, val ingredients: List<GetIngredientDto>)