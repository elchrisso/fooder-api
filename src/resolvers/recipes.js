import Recipe from '../db/models/recipe'
import Food from '../db/models/food'

export default {
  Query: {
    async allRecipes (_doc, _args, _context, _info) {
      try {
        const recipes = await Recipe.findAll()
        return recipes.map((recipe) => recipe.get({ plain: true }))
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async Recipe (_doc, args, _context, _info) {
      try {
        const recipe = await Recipe.findById(args.id, { include: [{model: Food, as: 'Foods', through: 'foods_recipes'}] })
        return recipe.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createRecipe (_doc, args, _context, _info) {
      try {
        //promise together create recipe and get foods
        const result = await Promise.all([
          Recipe.create(args),
          Food.findAll({
            where: {
              id: {
                $in: args.foodIds
              }
            }
          })
        ])
        //recipe.addfoods
        const [recipe, foods] = result
        const associate = recipe.addFoods(foods, { through: 'foods_recipes' })

        return recipe.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async updateRecipe (_doc, args, _context, _info) {
      try {
        const food = await Food.update(args)
        return food.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}