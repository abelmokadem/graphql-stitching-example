const request = require("request-promise-native");
const { makeExecutableSchema } = require("graphql-tools");

module.exports = makeExecutableSchema({
  typeDefs: `
  type Author { 
    id: ID!,
    name: String 
  }
  
  type Query {
    authorById(id: ID!): Author
  }
`,
  resolvers: {
    Query: {
      authorById: async (parent, args, context, info) => {
        return await request
          .get(
            `http://localhost:${process.env.GRAPHQL_PORT}/authors/${args.id}`
          )
          .then(author => JSON.parse(author));
      }
    }
  }
});
