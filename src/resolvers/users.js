import User from '../db/models/user'
import Profile from '../db/models/profile'
// import logger from '../logger'
import hash from 'password-hash'
import jwt from 'jsonwebtoken'

import { salt } from '../secrets'
import { isLoggedIn } from '../utils'

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
    },

    async User (_doc, args, _context, _info) {
      try {
        const user = await User.findById(args.id)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async loggedInUser (_doc, _args, context, _info) {
      try {
        console.log(context.token)
        const token = await isLoggedIn(context.token)
        console.log('made it', token)
        const user = await User.findById(token.data.id)
        return user.get({ plain: true })
      } catch (err) {
        console.log(err)
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
        let profile = await Profile.findOne({ where: { userId: user.id }})
        return (profile) ? profile.get({ plain: true }) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}