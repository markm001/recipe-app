package com.ccat.recipeapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RecipeAppApplication

fun main(args: Array<String>) {
	runApplication<RecipeAppApplication>(*args)
}
