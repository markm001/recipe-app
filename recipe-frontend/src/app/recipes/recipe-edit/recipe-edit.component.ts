import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../model/recipe";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/app.reducer";
import * as RecipeActions from "../store/recipe.actions"
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number
  editing = false
  recipeForm!: FormGroup
  private subscription!: Subscription

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.editing = params['id'] != null

        this.initForm()
      }
    )
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRoot.AppState>) {
  }

  private initForm() {
    let recipeName: String = ''
    let recipeImagePath: String = ''
    let recipeDescription: String = ''
    let recipeIngredients: FormArray = new FormArray<any>([])

    if (this.editing) {
      this.subscription = this.store.select('recipes').pipe(
        map(state => state.recipes.find(
              (_, index) => {
                return index == this.id
              })
          )
      ).subscribe((recipe) => {
        recipeName = recipe!.name
        recipeDescription = recipe!.description
        recipeImagePath = recipe!.imagePath
        recipeIngredients = this.checkRecipeIngredients(recipe!)
      })
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
      this.store.dispatch(RecipeActions.updateRecipe({
        index: this.id,
        recipe: recipe
      }))
    } else {
      this.store.dispatch(RecipeActions.addRecipe({ recipe }))
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
    this.router.navigate(['../'], {relativeTo: this.route}).then()
  }

  onDeleteIngredient(index:number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
