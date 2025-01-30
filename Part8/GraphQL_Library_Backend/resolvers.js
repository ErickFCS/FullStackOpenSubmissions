import { GraphQLError, subscribe } from 'graphql'
import Author from './models/authors.js'
import Book from './models/books.js'
import User from './models/users.js'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

export const resolvers = {
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
                const populatedSavedBook = await savedBook.populate('author')
                pubsub.publish('BOOK_ADDED', { bookAdded: populatedSavedBook })
                return populatedSavedBook
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
        }
    }
}