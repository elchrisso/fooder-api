import Recipe from '../db/models/recipe'

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
        const recipe = await Recipe.findById(args.id)
        return recipe.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}