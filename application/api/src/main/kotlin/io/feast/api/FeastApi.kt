package io.feast.api

import io.micronaut.runtime.Micronaut

object FeastApi {
    @JvmStatic
    fun main(args: Array<String>) {
        Micronaut.run(FeastApi.javaClass)
    }
}