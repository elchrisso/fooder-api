import express from 'express'
import bodyParser from 'body-parser'

import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import db from './db'
import schemaDef from './schema.graphqls'
import resolvers from './resolvers'

const app = express()
const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [schemaDef]
})

app.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
  schema,
  context: { someFutureAuth: 'someFutureToken' }
  })
))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const port = 3000

db.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  })

