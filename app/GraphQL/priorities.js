import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        priorities: [Priority]
        priority(id: ID!): Priority
    }

    type Priority {
        id: ID!
        slug: String
        name: String
    }
`

/**
 * resolver 是一个 promise， 作用是返回我们需要的值
 * 在目前的操作是 直接和数据库 进行交互
 * @type {{Query: {priorities: (function(): <Model[]>), priority: (function(*, *, *, *): <Model<any, any> | null> | <Model<any, any>>)}}}
 */
export const resolvers = {
    Query: {
        priorities: async () => db.priorities.findAll(),
        priority: async (obj, args, context, info) =>
            db.priorities.findByPk(args.id),
    },
}
