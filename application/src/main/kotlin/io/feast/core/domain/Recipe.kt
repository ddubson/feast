package io.feast.core.domain

data class Recipe(val id: String,
                  val name: String,
                  val ingredients: List<Ingredient>)