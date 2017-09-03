import Profile from '../db/models/profile'
import User from '../db/models/user'

export default {
  Query: {
    async allProfiles (_doc, _args, _context, _info) {
      try {
        const profiles = await Profile.findAll()
        return (profiles) ? profiles.map((profile) => profile.get({
          plain: true
        })) : []
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async Profile (_doc, args, _context, _info) {
      try {
        const profile = await Profile.findById(args.id)
        return (profile) ? profile.get({plain: true}) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async getProfileByUserId (_doc, args, _context, _info) {
      try {
        const profile = await Profile.findOne({where: {userId: args.userId}})
        return (profile) ? profile.get({plain: true}) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createProfile (_doc, args, _context, _info) {
      try {
        const profile = await Profile.create(args)
        return (profile) ? profile.get({plain: true}) : null
      } catch (err) {
        //logger.error(err)
        throw err
      }
    },

    async updateProfile (_doc, args, _context, _info) {
      try {
        const profile = await Profile.update(args, {where: { id: args.id }})
        return profile.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  Profile: {
    async userId (profile) {
      try {
        let user = await User.findById(profile.userId)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  }
}