package io.feast.core.domain

import arrow.core.Option

enum class WeightType(val weight: Int) {
    NONE(0),
    POUNDS(1)
}

data class Weight(val value: Float, val type: WeightType) {
    companion object {
        fun identity(): Weight = Weight(0f, WeightType.NONE)
    }
}

data class Quantity(val value: Float) {
    companion object {
        fun identity(): Quantity = Quantity(0f)
    }
}

data class Ingredient(val id: String,
                      val name: String,
                      val form: String,
                      val quantity: Option<Quantity>,
                      val weight: Option<Weight>)