import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../../model/recipe";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.editing = params['id'] != null

        this.initForm()
      }
    )
  }

  editing = false

  recipeForm!: FormGroup

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  private initForm() {
    let recipeName: String = ''
    let recipeImagePath: String = ''
    let recipeDescription: String = ''
    let recipeIngredients: FormArray = new FormArray<any>([])

    if (this.editing) {
      const recipe = this.recipeService.getRecipeById(this.id)

      recipeName = recipe.name
      recipeDescription = recipe.description
      recipeImagePath = recipe.imagePath
      recipeIngredients = this.checkRecipeIngredients(recipe)
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  private checkRecipeIngredients(recipe: Recipe): FormArray {
    if (recipe['ingredients']) {
      let ingredientArray: FormArray = new FormArray<any>([])
      recipe.ingredients.forEach(
        (ing) => {
          const ingredientGroup = new FormGroup({
            'name': new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount,
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          ingredientArray.push(ingredientGroup)
        })
      return ingredientArray
    }
    return new FormArray<any>([])
  }

  getIngredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imgPath,
      this.recipeForm.value.ingredients
    )

    if (this.editing) {
      this.recipeService.updateRecipe(this.id, recipe)
      //also works instead of created new Object:
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(recipe)
    }
    this.navigateToPreviousPage()
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null,
            [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      )
  }

  onCancel() {
    this.navigateToPreviousPage()
  }

  private navigateToPreviousPage() {
    this.editing = false
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }
}
