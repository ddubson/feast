package io.feast.api.dtos

data class WeightDto(val value: Float, val type: String)

data class QuantityDto(val value: Float)

data class GetIngredientDto(val id: String,
                            val name: String,
                            val form: String,
                            val quantity: QuantityDto,
                            val weight: WeightDto)

data class GetRecipeDto(val id: String, val name: String, val ingredients: List<GetIngredientDto>)