console.clear()

import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { mongoose } from 'mongoose'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import book from './models/books.js'
import author from './models/authors.js'

mongoose.connect(process.env.URI)
    .then(() => { console.log("Database connection sucessful") })
    .catch((err) => {
        console.log("Database connection failed")
        console.error(err)
    })

const typeDefs = `
type author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
}

type book {
    title: String!
    published: Int!
    author: author!
    id: ID!
    genres: [String!]!
}

type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author: String, genre: String):[book!]!
    allAuthors:[author!]!
}

type Mutation{
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): book!
    editAuthor(name: String!, setBornTo: Int!): author
}
`

const resolvers = {
    Query: {
        bookCount: async () => {
            return await book.countDocuments({})
        },
        authorCount: async () => {
            return await author.countDocuments({})
        },
        allBooks: async (root, args) => {
            const authorId = await author.findOne({ name: args.author })
            let query = args.author ? { author: authorId } : {}
            query = args.genre ? { ...query, genres: args.genre } : query
            return await book.find(query).populate('author')
        },
        allAuthors: async () => {
            return await author.find({})
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            let newBookAuthor;
            if (await author.countDocuments({ name: args.author })) {
                newBookAuthor = await author.findOne({ name: args.author })
            } else {
                newBookAuthor = new author({ name: args.author })
                newBookAuthor = await newBookAuthor.save()
            }
            const newBook = new book({ ...args, author: newBookAuthor.id })
            try {
                const savedBook = await newBook.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                })
            }
            return await savedBook.populate('author')
        },
        editAuthor: async (root, args) => {
            const target = await author.findOne({ name: args.name })
            if (!target) throw new GraphQLError('Author do not exist', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                }
            })
            target.born = args.setBornTo
            try {
                return await target.save()
            } catch (error) {
                throw new GraphQLError('Saving person failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
        }
    },
    author: {
        bookCount: async (root) => {
            return await book.countDocuments({ author: root.id })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})