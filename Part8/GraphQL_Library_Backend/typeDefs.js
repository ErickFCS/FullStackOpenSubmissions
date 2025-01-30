import fs from 'fs'

export const typeDefs = fs.readFileSync('./schemas.gql', 'utf8')