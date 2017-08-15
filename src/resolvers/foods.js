import Food from '../db/models/food'

export default {
  Query: {
    async allFoods (_doc, _args, _context, _info) {
      try {
        const foods = await Food.findAll()
        return foods.map((food) => food.get({ plain: true }))
      } catch (err) {
        //add logger and change console.log to logger
        console.log(err)
        throw err
      }
    },

    async Food (_doc, args, _context, _info) {
      try {
        const food = await Food.findById(args.id)
        return food.get({ plain: true})
      } catch (err) {
        //add logger and change console.log to logger
        console.log(err)
        throw err
      }
    }
  },

  Mutation: {
    async createFood (_doc, args, _context, _info) {
      try {
        const food = await Food.create(args)
        return food.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}