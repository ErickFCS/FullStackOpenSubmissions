console.clear()

import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mongoose } from 'mongoose'
import { resolvers } from './resolvers.js'
import { typeDefs } from './typeDefs.js'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import express from 'express'
import http from 'http'
import jwt from 'jsonwebtoken'
import User from './models/users.js'

mongoose.connect(process.env.URI)
    .then(() => { console.log("Database connection sucessful") })
    .catch((err) => {
        console.log("Database connection failed")
        console.error(err)
    })
const app = express()
const httpServer = http.createServer(app)
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
})
const schema = makeExecutableSchema({ typeDefs, resolvers })
const serverCleanUp = useServer({ schema }, wsServer)
const server = new ApolloServer({
    schema: schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanUp.dispose()
                    }
                }
            }
        }
    ]
})
await server.start()
app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            const auth = req ? req.headers.authorization : null
            try {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                const currentUser = await User.findById(decodedToken._id)
                if (!currentUser) throw new Error("no user");
                return { currentUser }
            } catch (error) {
                return {}
            }
        }
    })
)
const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
