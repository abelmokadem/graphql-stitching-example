process.env.GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const api = require("./api");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { mergeSchemas } = require("graphql-tools");
const { book, author } = require("./schemas");

// Link types
const linkTypeDefs = `
  extend type Book {
    author: Author
  }
  
  extend type Author {
    books: [Book]
  }
`;

// Big ol' schema
const schema = mergeSchemas({
  schemas: [book, author, linkTypeDefs],
  resolvers: mergeInfo => ({
    Book: {
      author: {
        fragment: "fragment BookFragment on Book { authorId }",
        resolve: (parent, args, context, info) => {
          const id = parent.authorId;

          return mergeInfo.delegate(
            "query",
            "authorById",
            {
              id: id
            },
            context,
            info
          );
        }
      }
    },
    Author: {
      books: {
        fragment: "fragment AuthorFragment on Author { id }",
        resolve: (parent, args, context, info) => {
          const id = parent.id;

          return mergeInfo.delegate(
            "query",
            "booksByAuthorId",
            {
              authorId: id
            },
            context,
            info
          );
        }
      }
    }
  })
});

// Initialize the app
const app = express();

app.use(morgan("dev"));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    tracing: true
  })
);

api(app);

// Start the server
app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(
    `Go to http://localhost:${
      process.env.GRAPHQL_PORT
    }/graphiql to run queries!`
  );
});
