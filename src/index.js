import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import db from './db'
import schemaDef from './schema.graphqls'
import resolvers from './resolvers'
import './db/associations'

const app = express()
const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [schemaDef]
})

app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
  schema,
  context: { token: req.headers.authorization }
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

