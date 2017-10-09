import FeedItem from '../db/models/feed_item'

export default {
  Query: {
    async allFeedItems (_doc, _args, _context, _info) {
      try {
        const feedItems = await FeedItem.findAll()
        return feedItems.map((feedItem) => feedItem.get({ plain: true }))
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createFeedItem (_doc, args, _context, _info) {
      try {
        const feedItem = await FeedItem.create(args)
        return feedItem.get({ plain: true })
      } catch (err) {
        //logger.error(err)
        throw err
      }
    }
  }
}