const request = require("request-promise-native");
const { makeExecutableSchema } = require("graphql-tools");

module.exports = makeExecutableSchema({
  typeDefs: `
  type Book { 
    id: ID!, 
    title: String,
    authorId: ID!
  }

  type Query {  
    bookById(id: ID!): Book,
    booksByAuthorId(authorId: ID!): [Book]
  }
`,
  resolvers: {
    Query: {
      bookById: async (parent, args, context, info) => {
        return await request
          .get(`http://localhost:${process.env.GRAPHQL_PORT}/books/${args.id}`)
          .then(book => JSON.parse(book));
      },
      booksByAuthorId: async (parent, args, context, info) => {
        return await request
          .get(
            `http://localhost:${process.env.GRAPHQL_PORT}/authors/${
              args.authorId
            }/books`
          )
          .then(book => JSON.parse(book));
      }
    }
  }
});
