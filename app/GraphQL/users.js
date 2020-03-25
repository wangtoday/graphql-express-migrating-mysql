import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(id: ID!, email: String!,name:String!): User!
        updateUser(id:ID!):String
    }


    type User {
        id: ID!
        email: String
        name: String
    }
`

export const resolvers = {
    Query: {
        users: async () => db.users.findAll(),
        user: async (obj, args, context, info) => db.users.findByPk(args.id),
    },
    Mutation: {
        // 1 修改
        updateUser: async (parent, args) => {
            return db.users.update({ name: 'new name whatever' }, { where: { id: args.id } }).then(value=>"haha")
        },
        // 2 创建
        createUser: async (parent, args) => {
            console.log('----: ', args, parent)
            return db.users.create({
                id: args.id,
                name: args.name,
                email: args.email,
            }).then(value => {
                console.log(value, args)
                return args
            })
        },
    },
}

// mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
//     createReview(episode: $ep, review: $review) {
//         stars
//         commentary
//     }
// }
