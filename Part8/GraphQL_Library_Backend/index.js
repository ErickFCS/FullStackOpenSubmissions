console.clear()

import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { mongoose } from 'mongoose'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v1 as uuid } from 'uuid'
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
            return await book.find({}).populate('author')
            // let res = books
            // if (args.author)
            //     res = res.filter((e) => e.author === args.author)
            // if (args.genre)
            //     res = res.filter((e) => e.genres.some((ee) => ee === args.genre))
            // return res
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
            const savedBook = await newBook.save()
            return await savedBook.populate('author')
        },
        editAuthor: (root, args) => {
            return null
            // const target = authors.find((e) => e.name == args.name)
            // if (!target) return null
            // target.born = args.setBornTo
            // return target
        }
    },
    author: {
        bookCount: (root) => 0
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