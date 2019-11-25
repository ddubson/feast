package io.feast.core.domain

import arrow.core.Option

enum class WeightType(val weight: Int) {
    NONE(0),
    POUNDS(1)
}

data class Weight(val value: Float, val type: WeightType)

data class Quantity(val value: Float)

data class Ingredient(val id: String,
                      val name: String,
                      val form: String,
                      val quantity: Option<Quantity>,
                      val weight: Option<Weight>)