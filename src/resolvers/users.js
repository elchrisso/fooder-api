import User from '../db/models/user'
import Profile from '../db/models/profile'
//import logger from '../logger'
import hash from 'password-hash'
import jwt from 'jsonwebtoken'

import { salt } from '../../secrets'

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
    async loginUser (_doc, args, _context, _info) {
      try {
        let foundUser = await User.findOne({
          where: {
            email: args.email
        }})

        if (!foundUser) {
          console.log("User not found!")
          return { token: null }
        }

        foundUser = foundUser.get({ plain: true })
        console.log(foundUser)

        if (hash.verify(args.password, foundUser.hashedPassword)) {
          delete foundUser.hashedPassword
          return {
            token: jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              data: foundUser
            }, salt)
          }
        }
      } catch (err) {
        throw err
      }
    },

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