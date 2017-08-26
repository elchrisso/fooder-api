import Food from './models/food'
import Recipe from './models/recipe'
import Profile from './models/profile'
import User from './models/user'

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

Profile.belongsTo(User, { foreignKey: 'userId'})