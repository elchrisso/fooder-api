import User from '../db/models/user'
import Profile from '../db/models/profile'
//import logger from '../logger'

export default {
  Query: {
    async allUsers (_doc, _args, _context, _info) {
      try {
        const users = await User.findAll()
        return (users) ? users.map((user) => user.get({
          plain: true
        })) : []
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createUser (_doc, args, _context, _info) {
      try {
        const user = await User.create(args)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  User: {
    async profile (user) {
      try {
        let user = await User.findById(args.id)
        user = await user.update(args)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}