console.clear()

import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { mongoose } from 'mongoose'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import Book from './models/books.js'
import Author from './models/authors.js'
import User from './models/users.js'
import jwt from 'jsonwebtoken'

mongoose.connect(process.env.URI)
    .then(() => { console.log("Database connection sucessful") })
    .catch((err) => {
        console.log("Database connection failed")
        console.error(err)
    })

const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
}

type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author: String, genre: String):[Book!]!
    allAuthors:[Author!]!
    me: User!
}

type Mutation{
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
}
`

const resolvers = {
    Query: {
        bookCount: async () => {
            return await Book.countDocuments({})
        },
        authorCount: async () => {
            return await Author.countDocuments({})
        },
        allBooks: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            let query = args.author ? { author: author.id } : {}
            query = args.genre ? { ...query, genres: args.genre } : query
            return await Book.find(query).populate('author')
        },
        allAuthors: async () => {
            return await Author.find({})
        },
        me: async (root, args, context) => {
            if (context.currentUser) {
                return await User.findById(context.currentUser)
            } else {
                throw new GraphQLError('No user found')
            }
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser)
                throw new GraphQLError('Can\'t create book without logging in', {
                    extensions: {
                        code: '401 FORBIDEN',
                    }
                })
            let newBookAuthor;
            if (await Author.countDocuments({ name: args.author })) {
                newBookAuthor = await Author.findOne({ name: args.author })
            } else {
                newBookAuthor = new Author({ name: args.author })
                newBookAuthor = await newBookAuthor.save()
            }
            const newBook = new Book({ ...args, author: newBookAuthor.id })
            try {
                const savedBook = await newBook.save()
                return await savedBook.populate('author')
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                })
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser)
                throw new GraphQLError('Can\'t edit author without logging in', {
                    extensions: {
                        code: '401 FORBIDEN',
                    }
                })
            const target = await Author.findOne({ name: args.name })
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
        },
        createUser: async (root, args) => {
            const { username, favoriteGenre } = args
            const user = new User({ username, favoriteGenre })
            return await user.save()
                .catch((err) => {
                    throw new GraphQLError('Saving user failed', {
                        extensions: {
                            error: err
                        }
                    })
                })
        },
        login: async (root, args) => {
            const { username, password } = args
            const user = await User.findOne({ username })
            if (user && password === 'password') {
                const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
                return { value: token }
            } else {
                return null
            }
        }

    },
    Author: {
        bookCount: async (root) => {
            return await Book.countDocuments({ author: root.id })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken._id)
            return { currentUser }
        }
        return {}
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})