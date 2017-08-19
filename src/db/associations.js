import Food from './models/food'
import Recipe from './models/recipe'

Food.belongsToMany(Recipe, {
  as: 'Recipes',
  through: 'foods_recipes',
  foreignKey: 'foodId'
})

Recipe.belongsToMany(Food, {
  as: 'Foods',
  through: 'foods_recipes',
  foreignKey: 'recipeId'
})
